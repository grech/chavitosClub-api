import { Router } from "express";
import { ContratosController } from "./controller";
import { ContractService } from "../../../application/services";
import { MySqlContractRepository } from "../../../infrastructure/repositories/mysql-contract.repository";
import { MySQLCustomerRepository } from "../../../infrastructure/repositories/mysql-customer.repostory";


export class ContratosRouter {

     static get routes(): Router{

          const routes = Router();

          const mysqlContractRepo = new MySqlContractRepository();
          const mysqlCustomerRepo = new MySQLCustomerRepository();

          const contractService = new ContractService(mysqlCustomerRepo, mysqlContractRepo)

          const contractController = new ContratosController(contractService);

          routes.post('/crear', contractController.saludo)

          return routes;
     }


}