import { IServiceRepository } from "../../domain/servicios/repositories/IService.repositorie";
import { ServicesDto } from "../dtos";



export class ServicesService {

     constructor(
          private readonly services: IServiceRepository
     ){}


     async listServices(servicedto: ServicesDto){
          try {
               const {eventDate} = servicedto;
               const data = await this.services.getListServices(eventDate);
               return data;
          } catch (error) {
               return error;
          }
     }

     
}