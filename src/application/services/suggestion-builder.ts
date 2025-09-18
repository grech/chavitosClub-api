import { PoolConnection } from "mysql2/promise";
import { ContractSuggestion, PackageQuote, SuggestionPayload } from "../../domain/entities/contract-sugestions";

export interface PirceLookup {
     getServicePriceForHours(serviceId: number, hours: number, conn: PoolConnection): Promise<number>;
     getPackageCandidatesByServices(serviceIds: number[], conn: PoolConnection): Promise<{ packageId: number; items: number[] }[]>;
     getPackagePriceForHours(packageId: number, hours: number, conn: PoolConnection): Promise<number>;
}

export class SuggestionBuilder {

     constructor (
          private readonly price: PirceLookup
     ){}

     async buildSnapshot(contractId: string, eventId: string, hours: number, selectedServices: number[], vatRate: number, conn: PoolConnection) {
          
          
          // precios sueltos 
          const unique = Array.from(new Set(selectedServices.map(Number)))
          const servicePrice = new Map<number, number>();
          let sumSelected = 0;
          for (const sid of unique){
               const p = await this.price.getServicePriceForHours(sid, hours, conn);
               servicePrice.set(sid, p);
               sumSelected += p;
          }

          // paquetes problables 
          const candidates = await this.price.getPackageCandidatesByServices(unique, conn);
          const scored: Array<{ packageId: number; items: number[]; pkgPrice: number; itemsSum: number; savings: number }> = [];
          for (const c of candidates) {
               const pkgPrice = await this.price.getPackagePriceForHours(c.packageId, hours, conn);
               const itemsSum = c.items.reduce((acc, sid) => acc + (servicePrice.get(sid) ?? 0), 0);
               const savings = +(itemsSum - pkgPrice).toFixed(2);
               if (savings > 0) scored.push({ packageId: c.packageId, items: c.items, pkgPrice, itemsSum, savings});
          }
          if(!scored.length) return null;

          // greedy para mayor ahorro 
          scored.sort((a,b) => b.savings - a.savings);
          const covered = new Set<number>();
          const packages: PackageQuote[] = [];
          for (const s of scored) {
               if(s.items.every(id => !covered.has(id))){
                    packages.push({packageId: s.packageId, quaintity: 1, subtotal: s.pkgPrice});
                    s.items.forEach(i => covered.add(i));
               }
          }//fin del for 

          const remainingServices = unique.filter(id => !covered.has(id));
          const savingsTotal = packages.reduce( (acc, p) => {
               const pack = scored.find(x => x.packageId === p.packageId)!;
               return acc + pack.savings;
          }, 0 )


          const payload : SuggestionPayload = {
               hours,
               packages,
               coveredServices: Array.from(covered),
               remainingServices,
               vatRate,
               calcAt: new Date().toISOString()
          };

          const suggestion: ContractSuggestion ={
               id: crypto.randomUUID(),
               contractId,
               eventId,
               hours,
               payload,
               savings: +savingsTotal.toFixed(2),
               status: "PENDING",
               createdAt: new Date(),
               expiresAt: new Date(Date.now() + 15 * 60 * 1000)// 15 minutos
          };

          return suggestion;

     }
}