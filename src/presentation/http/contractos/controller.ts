import { Request, Response } from "express";
import { CreateContractDto } from "../../../application/dtos";
import { CustomError } from "../../../domain/errors";
import { ContractService } from "../../../application/services";



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
          console.log(req.body)
          const [error, contractDto] = CreateContractDto.create(req.body);
          if(error){
               res.status(400).json({error: error})
               return;
          }
          console.log('se valido correctamente el dto')

          // console.log(`el usuario es ${envs.USER_DB} y el pass es ${envs.PASS_DB}`)
          
          this.contractSerice.create(contractDto!)
          .then(response => res.json(response))
          .catch(error => this.handleError(error,res))

     }

     confirmSugestion = (req:Request, res: Response) => {
          const {contractId, suggestionId} = req.body
          this.contractSerice.confirmSuggestion(contractId, suggestionId)
          .then(response => res.json(response))
          .catch(error => this.handleError(error, res))
     }

     getSErvices = (req:Request, res: Response) => {

          return res.json({message: "catalogo de serrvicios"})
     }
}