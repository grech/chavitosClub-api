import { Router } from "express";
import { ServicesController } from "./controller";
import { MySqlServiceRepository } from "../../../infrastructure/repositories/servicios/mysql-service.repository";
import { ServicesService } from "../../../application/services/services.service";



export class ServiciosRouter {

     static get routes(): Router{
          
          
          const routes = Router();

          const mysqlServiceREpo = new MySqlServiceRepository();
          const serviceServices = new ServicesService(mysqlServiceREpo);
          const servicesController = new ServicesController(serviceServices);


          routes.get('/list', servicesController.getServices)

          return routes;
     }
}