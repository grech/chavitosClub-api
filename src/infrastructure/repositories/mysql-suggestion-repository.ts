import { PoolConnection } from "mysql2/promise";
import { ContractSuggestion } from "../../domain/entities/contract-sugestions";
import { IContractSuggestionRepository } from "./contract-suggestion-repository";
import { execQuery } from "../../config/execQuery";
import { sueggestionQuerys } from "../querys/suggestionQuerys";


export class MySqlContractSuggestionRepository implements IContractSuggestionRepository{

  

     async create(s: ContractSuggestion, conn?: PoolConnection){
          await execQuery({qry: sueggestionQuerys.createSuggestion, values: [s.id, s.contractId, s.eventId, s.payload.hours, JSON.stringify(s.payload), s.savings, s.status,s.createdAt, s.expiresAt], conn})
     }

     async findById(id: string, conn?: PoolConnection){
          const rows = await execQuery<any[]>({qry: sueggestionQuerys.findById, values:[id], conn})
          // if(rows.length === 0) return null;
          return rows[0] ?  this.map(rows[0]) : null;
     }
           
     async findByIdForUpdate(id: string, conn: PoolConnection){
          const rows = await execQuery<any[]>({qry: sueggestionQuerys.findByIdForUpdate, values:[id], conn});
          return rows[0] ? this.map(rows[0]): null;
     }

     async markAsApplied(id: string, appliedAt: Date, conn?: PoolConnection){
          await execQuery({qry: sueggestionQuerys.markAsApplied, values:[appliedAt, id], conn});
     }

     async expire(id: string, conn?: PoolConnection) {
          await execQuery({qry: sueggestionQuerys.expire, values:[id], conn});
     }

     private map(r: any): ContractSuggestion {
    return {
      id: r.id,
      contractId: r.contract_id,
      eventId: r.event_id,
      savings: Number(r.savings_mxn),
      status: r.status,
      createdAt: new Date(r.created_at),
      expiresAt: new Date(r.expires_at),
      appliedAt: r.applied_at ? new Date(r.applied_at) : undefined,
      payload: typeof r.payload_json === "string"
        ? JSON.parse(r.payload_json)
        : r.payload_json
    };
  }

}