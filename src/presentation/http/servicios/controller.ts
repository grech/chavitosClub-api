import { Request, Response } from "express"
import { CustomError } from "../../../domain/errors";
import { ServicesDto } from "../../../application/dtos";
import { ServicesService } from "../../../application/services/services.service";




export class ServicesController {

     constructor(
          private readonly serviceServices: ServicesService
     ){}

     private handleError = (error: unknown, res: Response) => {
          if(error instanceof CustomError ){
               return res.status(error.statusCode).json({error: error.message})
          } 

          console.log(error)
          return res.status(500).json({error: `Internla Server Error`})
     }

     

     getServices = (req: Request, res: Response) =>{

          const [error, servicesDto] = ServicesDto.getServices(req.query);
          if(error){
               res.status(400).json({error:error});
               return;
          }

          this.serviceServices.listServices(servicesDto!)
               .then(data => res.status(200).json(data))
               .catch( error => this.handleError(error, res) )
  
     }

}