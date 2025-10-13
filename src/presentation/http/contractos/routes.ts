import { Router } from "express";
import { ContratosController } from "./controller";
import { ContractService } from "../../../application/services";
import { MySqlContractRepository } from "../../../infrastructure/repositories/mysql-contract.repository";
import { MySQLCustomerRepository } from "../../../infrastructure/repositories/mysql-customer.repostory";
import { MySqlContractSuggestionRepository } from "../../../infrastructure/repositories/mysql-suggestion-repository";
import { MySQLEventRepository } from "../../../infrastructure/repositories/mysql-event.repository";
import { MySQLPriceLookup } from "../../../infrastructure/adapters/price-lookup";
import { SuggestionBuilder } from "../../../application/services/suggestion-builder";


export class ContratosRouter {

     static get routes(): Router{

          const routes = Router();

          const mysqlContractRepo = new MySqlContractRepository();
          const eventRepo = new MySQLEventRepository()
          const suggestionRepo = new MySqlContractSuggestionRepository()
          const mysqlCustomerRepo = new MySQLCustomerRepository();

          const priceLookup = new MySQLPriceLookup();
          const suggestionBuilder = new SuggestionBuilder(priceLookup)

          const contractService = new ContractService(
               mysqlCustomerRepo, 
               mysqlContractRepo,
               eventRepo,
               suggestionRepo,
               suggestionBuilder
               )

          const contractController = new ContratosController(contractService);

          routes.post('/crear', contractController.saludo)
          routes.post('/confirmSuggestion', contractController.confirmSugestion)

          

          return routes;
     }


}