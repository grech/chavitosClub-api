import { Request, Response } from "express";
import { CreateContractDto } from "../../../application/dtos";
import { CustomError } from "../../../domain/errors";
import { ContractService } from "../../../application/services";
import { envs } from "../../../config/envs";


export class ContratosController {

     constructor(
          public contractSerice: ContractService
     ){}

     private handleError = (error: unknown, res: Response) => {
          if(error instanceof CustomError ){
               return res.status(error.statusCode).json({error: error.message})
          } 

          console.log(error)
          return res.status(500).json({error: `Internla Server Error`})
     }

     saludo = (req: Request, res: Response) => {
          // console.log(req.body)
          const [error, contractDto] = CreateContractDto.create(req.body);
          if(error){
               res.status(400).json({message: error})
               return;
          }

          console.log(`el usuario es ${envs.USER_DB} y el pass es ${envs.PASS_DB}`)
          
          this.contractSerice.create(contractDto!)
          .then(response => res.json(response))
          .catch(error => this.handleError(error,res))

     }
}