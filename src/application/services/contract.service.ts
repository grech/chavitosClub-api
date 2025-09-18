import { PoolConnection } from "mysql2/promise";
import { withTransaction } from "../../config/transactionDB";
import { IContractRepository } from "../../infrastructure/repositories/contract-repository";
import { ICustomerRepository } from "../../infrastructure/repositories/customer-repository";
import { CreateContractDto } from "../dtos";
import { IEventRepository } from "../../infrastructure/repositories/event-repository";
import { IContractSuggestionRepository } from "../../infrastructure/repositories/contract-suggestion-repository";
import { SuggestionBuilder } from "./suggestion-builder";

export class ContractService {

     constructor(
          private readonly customers: ICustomerRepository,
          private readonly contracts: IContractRepository,
          private readonly events: IEventRepository,
          private readonly suggestions: IContractSuggestionRepository,
          private readonly suggestionBuilder: SuggestionBuilder
     ){}

     async create( dto: CreateContractDto ) {
          return withTransaction(async (conn: PoolConnection) => {
               // validar la informacion o existencia del cliente
               const existing = await this.customers.getByEmailOrRfc(dto.email,dto.rfc, conn);
               const customerId = existing?.id ?? crypto.randomUUID();

               if(!existing) {
                    await this.customers.create({
                         id: customerId,
                         name: dto.name,
                         phone: dto.phone,
                         email: dto.email,
                         rfc: dto.rfc
                    }, conn);
               }

               // calcular items 

               const eventId = crypto.randomUUID();
               const items = [];
               let subtotal = 0;

               for (const sid of dto.services.map(Number)) {
                    const price = await this.contracts.getServicePriceHour(sid, conn);
                    const q = 1;
                    const itemSubtotal =+(price * q ).toFixed(2);
                    subtotal += itemSubtotal;
                    console.log(`el precio del servicio ${sid} es ${price}`)
                    items.push({
                         id: crypto.randomUUID(),
                         serviceId: sid,
                         name: "",
                         quantity: q,
                         subtotal: itemSubtotal
                    });
               }

               const vatRate = 0.16;
               const tax = + (subtotal * vatRate).toFixed(2)
               const total = +(subtotal + tax).toFixed(2);

               //armar entity contract
               const contractEntity = {
                    id: crypto.randomUUID(),
                    customerId,
                    status: "DRAFT" as const,
                    createdAt: new Date(),
                    subtotal, 
                    tax,
                    total,
                    event: {
                         id: eventId,
                         address: dto.address,
                         date: new Date(dto.eventDate),
                         hours: dto.hours,
                         items
                    }
               };

               //realizar los inserts persitentes
               await this.contracts.create(contractEntity, conn)

               // validar posibles descuentos y suggestionID

               const suggestion = await this.maybeCreateSuggestion(contractEntity.id, eventId, dto.hours, dto.services.map(Number), conn);

               return {message: "contract created", contractId: contractEntity.id, suggestion};


          })//fin se la transaccion
     }


     private async maybeCreateSuggestion( contractId: string, eventId: string, hours: number, selectedServices: number[], conn: PoolConnection){
          const vatRate = 0.16;
          const suggestion = await this.suggestionBuilder.buildSnapshot(contractId, eventId, hours, selectedServices, vatRate, conn);
          if(!suggestion) return null;
          await this.suggestions.create(suggestion, conn);
          return {
               id: suggestion.id,
               expiresAt: suggestion.appliedAt,
               savings: suggestion.savings,
               packages: suggestion.payload.packages
          };
     }


     // confirmation
     async confirmSuggestion(contractId: string, suggestionId: string){
           return withTransaction(async (conn) => {
               //  lock de la sugerencia
               const sug = await this.suggestions.findByIdForUpdate(suggestionId, conn);
               if(!sug || sug.contractId !== contractId) throw new Error("Sugerencia no valida");
               if(sug.status === "APPLIED"){
                    // idempotencia aplicada
                    const {subtotal} = await this.events.sumSubtotals(sug.eventId, conn);
                    const tax = +(subtotal * sug.payload.vatRate).toFixed(2);
                    const total = +(subtotal + tax).toFixed(2);
                    return {ok: true, subtotal, tax, total} 
               }
               if( sug.expiresAt && sug.expiresAt < new Date()){
                    await this.suggestions.expire(suggestionId, conn);
                    throw new Error("Sugerencia expirada")
               }

               //aplicar snapshot 
               if(sug.payload.coveredServices.length) {
                    await this.events.deleteCoveredServices(sug.eventId, sug.payload.coveredServices, conn);
               }
               for (const p of sug.payload.packages){
                    await this.events.insertEventPackage(sug.eventId, p.packageId, p.quaintity, p.subtotal, conn);
               }

               //Recalcular los totales
               const {subtotal} = await this.events.sumSubtotals(sug.eventId, conn);
               const tax = +(subtotal * sug.payload.vatRate).toFixed(2);
               const total = +(subtotal + tax).toFixed(2);
               await this.contracts.updateTotals(sug.contractId, subtotal, tax, total, conn)
               
               //se aplica
               await this.suggestions.markAsApplied(suggestionId, new Date(), conn);

               return {ok: true, subtotal, tax, total}



           })
     }

     
}