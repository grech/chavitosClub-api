import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { IEventRepository } from "./event-repository";
import { execQuery } from "../../config/execQuery";
import { eventQuerys } from "../querys/eventQuerys";

interface SumRow extends RowDataPacket{
     s: number;
}


export class MySQLEventRepository implements IEventRepository {

     async deleteCoveredServices(eventId: string, servicesIds: number[], conn: PoolConnection) {
          if(!servicesIds.length) return;
          await execQuery({qry:  `DELETE FROM chavitos_club.event_services WHERE event_id=? AND services_id IN (${servicesIds.map(()=>'?').join(',')})`, 
               values: [eventId, ...servicesIds], conn});
     }

     async insertEventPackage( eventId: string, packageId: number, quantity: number, subtotal: number, conn: PoolConnection){
          await execQuery({qry: eventQuerys.insertEvenPAckage, values: [eventId, packageId, quantity, subtotal], conn})
     }

     async sumSubtotals(eventId: string, conn: PoolConnection) {
          console.log(`vamos a consultar el evento ${eventId}`)
          const [s1] = await execQuery<SumRow[]>({
               qry: eventQuerys.sumSubtotalsQuery,
               values: [eventId],
               conn
          });

       

          const [s2] = await execQuery<SumRow[]>({
               qry: eventQuerys.sumServicesTotal, 
               values: [eventId], 
               conn
          });
          return {subtotal: +(Number(s1?.s ?? 0) + Number(s2?.s ?? 0)).toFixed(2)};
     }
}