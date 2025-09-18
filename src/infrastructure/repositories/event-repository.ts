import { PoolConnection } from "mysql2/promise";


export interface IEventRepository {
     deleteCoveredServices(eventId: string, servicesIds: number[], conn: PoolConnection): Promise<void>;
     insertEventPackage(eventId: string, packageId: number, quantity: number, subtotal: number, conn: PoolConnection): Promise<void>;
     sumSubtotals(eventId: string, conn: PoolConnection): Promise<{ subtotal: number }>;
}