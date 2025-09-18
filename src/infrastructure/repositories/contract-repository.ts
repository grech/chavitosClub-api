import { PoolConnection } from "mysql2/promise";
import { Contract } from "../../domain/entities/";

export interface IContractRepository {
     getServicePriceHour (serviceId: number, conn?: PoolConnection): Promise<number>;
     create(contract: Contract, conn?: PoolConnection):Promise<void>;
     getById( id: string, conn?: PoolConnection): Promise<Contract | null>;
     updateTotals(contractId: string, subtotal: number, tax: number, total: number, conn: PoolConnection): Promise<void>;
     // getServicePriceForHours(serviceId: number, hours: number, conn: PoolConnection): Promise<number>; 
     
}