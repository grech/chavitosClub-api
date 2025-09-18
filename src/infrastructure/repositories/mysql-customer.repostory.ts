import { PoolConnection } from "mysql2/promise";
import { Customer } from "../../domain/entities";
import { ICustomerRepository } from "../../infrastructure/repositories/customer-repository";
import { execQuery } from "../../config/execQuery";
import { customerQuerys } from "../querys";


export class MySQLCustomerRepository implements ICustomerRepository  {
     async getByEmailOrRfc(email: string, rfc: string, conn?: PoolConnection){
          const rows = await execQuery<any[]>({qry:  customerQuerys.getByEmailOrRfc,
               values:[email, rfc], conn});
               if (!rows.length) return null;
               const r = rows[0];
               return {id: r.id, name: r.name, phone: r.phone, email: r.email, rfc: r.rfc} as Customer;
     }

     async create(c: Customer, conn?: PoolConnection){
          await execQuery({qry: customerQuerys.create, values:[c.id, c.name, c.phone, c.email,c.rfc], conn});
     }
}