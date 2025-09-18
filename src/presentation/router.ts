import { Router } from "express";
import {ContratosRouter} from './http/'


export class AppRouter {

     static get routes(): Router{

          const router = Router();

          router.use('/api/contratos',ContratosRouter.routes)
          return router;
     }
}