import { PoolConnection } from "mysql2/promise";
import { IContractRepository } from "./contract-repository";
import { execQuery } from "../../config/execQuery";
import { Contract } from "../../domain/entities";
import { contractQuerys } from "../querys";


export class MySqlContractRepository implements IContractRepository {
     async getServicePriceHour(serviceId: number, conn?: PoolConnection) {
          const rows = await execQuery<any[]>({qry: contractQuerys.getServicePrices, values:[serviceId], conn});
          if(!rows.length) throw new Error(`Servicio ${serviceId} no encontrado`);
          console.log(` retornamos ${rows[0].price}con el serivio ${serviceId}`)
          return Number(rows[0].price);
     }

     async create(contract: Contract, conn: PoolConnection){

          //event
          await execQuery({qry: contractQuerys.createEvent, values: [contract.event.id, contract.event.address, new Date(), contract.customerId, contract.event.date], conn})

          for(const it of contract.event.items){
               //event services
               await execQuery({qry: contractQuerys.createService, values: [contract.event.id, it.serviceId, it.id, it.quantity, it.subtotal], conn})
          }

          //contract

          await execQuery({qry: contractQuerys.create, values:[contract.id, contract.event.id, contract.tax, contract.total], conn})
     }

     async getById(id: string, conn?: PoolConnection) {
          const rows = await execQuery({qry: contractQuerys.getContractById, values: [id], conn});
          if(!rows.length) throw new Error(`Contract not found`);
          // const contract rows[0]
          return null;
     }

     async updateTotals(contractId: string, subtotal: number, tax: number, total: number, conn: PoolConnection) {
          await execQuery({qry: contractQuerys.updateTotals, values: [subtotal, tax, total, contractId], conn})
     }

}