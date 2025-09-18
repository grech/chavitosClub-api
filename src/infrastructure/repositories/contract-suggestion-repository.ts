import { PoolConnection } from "mysql2/promise";
import { ContractSuggestion } from "../../domain/entities/contract-sugestions";

export interface IContractSuggestionRepository {
     create(s: ContractSuggestion, conn: PoolConnection): Promise<void>;
     // para confirmacion de idempotencia se bloquea la fila
     findById(id: string, conn?: PoolConnection): Promise<ContractSuggestion | null>;
     findByIdForUpdate(id: string, conn: PoolConnection): Promise<ContractSuggestion |null>;
     markAsApplied(id: string, appliedAt: Date, conn?: PoolConnection): Promise<void>;
     expire(id: string, conn?: PoolConnection): Promise<void>;
}