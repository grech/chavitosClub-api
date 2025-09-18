import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { IEventRepository } from "./event-repository";
import { execQuery } from "../../config/execQuery";

interface SumRow extends RowDataPacket{
     s: number;
}


export class MySQLEventRepository implements IEventRepository {

     async deleteCoveredServices(eventId: string, servicesIds: number[], conn: PoolConnection) {
          if(!servicesIds.length) return;
          await execQuery({qry: 'TODO QUery', values: [eventId, ...servicesIds], conn});
     }

     async insertEventPackage( eventId: string, packageId: number, quantity: number, subtotal: number, conn: PoolConnection){
          await execQuery({qry: 'TODO Query', values: [eventId, packageId, quantity, subtotal], conn})
     }

     async sumSubtotals(eventId: string, conn: PoolConnection) {
          const [s1] = await execQuery<SumRow[]>({
               qry: 'TODO QUerys',
               values: [eventId],
               conn
          });

          const [s2] = await execQuery<SumRow[]>({
               qry: 'TODO Querys', 
               values: [eventId], 
               conn
          });
          return {subtotal: +(Number(s1?.s ?? 0) + Number(s2?.s ?? 0)).toFixed(2)};
     }
}