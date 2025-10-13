import { Router } from "express";
import {ContratosRouter} from './http/'
import { ServiciosRouter } from "./http/servicios/routes";


export class AppRouter {

     static get routes(): Router{

          const router = Router();

          router.use('/api/contratos',ContratosRouter.routes)
          router.use('/api/servicios', ServiciosRouter.routes)
          return router;
     }
}