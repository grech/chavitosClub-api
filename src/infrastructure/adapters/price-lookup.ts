import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { PirceLookup } from "../../application/services/suggestion-builder";
import { execQuery } from "../../config/execQuery";
import { priceLookQuerys } from "../querys/querysPrice";


interface priceRow extends RowDataPacket {
     price: number
}

interface packageRow extends RowDataPacket {
     package_id: number
}

interface serviceRow extends RowDataPacket{
     price: number
}

export class MySQLPriceLookup implements PirceLookup {
     async getServicePriceForHours(serviceId: number, hours: number, conn: PoolConnection): Promise<number> {
          console.log(`el servicio a consultar es ${serviceId}`)
          const rows = await execQuery<priceRow[]>({qry: priceLookQuerys.servicePriceQueryHours, values: [serviceId,hours]});
          if(!rows.length) throw new Error('Precio no encotrado para este servicio');
          return Number(rows[0].price)
     }

     async getPackageCandidatesByServices(serviceIds: number[], conn: PoolConnection): Promise<{ packageId: number; items: number[]; }[]> {
          if(!serviceIds.length) return[];
          const inList = serviceIds.map(() => '?').join(',');
          const rows = await execQuery<packageRow[]>({qry: ` SELECT p.id AS package_id FROM chavitos_club.packages p JOIN chavitos_club.package_items pi ON pi.package_id = p.id WHERE pi.service_id IN (${inList}) GROUP BY p.id HAVING COUNT(*) = ( SELECT COUNT(*) FROM chavitos_club.package_items pi2 WHERE pi2.package_id = p.id)`,
                    values: serviceIds,
                    conn,
               });
          
          // cargar los items por paquetes
          const out: {packageId: number; items: number[]}[] =[];
          for (const r of rows) {
               const items = await execQuery<serviceRow[]>({qry: priceLookQuerys.getServiceId, values:[r.package_id], conn});
               out.push({packageId: r.package_id, items: items.map(i => Number(i.service_id)) })
          }
          return out;
     }


     async getPackagePriceForHours(packageId: number, hours: number, conn: PoolConnection): Promise<number> {
          console.log(`los valores a evaluar son packageId: ${packageId}, hours: ${hours}, `)
          const rows = await execQuery<priceRow[]>({qry: priceLookQuerys.getPackagepriceHour, values:[packageId, hours], conn});
          if(!rows.length) throw new Error("Precio no encontrado para el paquete ");
          return Number(rows[0].price)
     }



}