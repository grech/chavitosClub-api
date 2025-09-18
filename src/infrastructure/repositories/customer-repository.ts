import { PoolConnection } from "mysql2/promise";
import { Customer } from "../../domain/entities/";

export interface ICustomerRepository {
     getByEmailOrRfc(email: string, rfc: string, conn?: PoolConnection): Promise<Customer | null>;
     create(customer: Customer, conn?: PoolConnection): Promise<void>;
}
