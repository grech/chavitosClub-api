import { Service } from "../../../domain/servicios/entities/Service";
import { IServiceRepository } from "../../../domain/servicios/repositories/IService.repositorie";
import { execQuery } from "../../../config/execQuery";
import { servicesQuerys } from "../../querys/servicesQuerys";


export class MySqlServiceRepository implements IServiceRepository{

     async getListServices(eventDate: Date){
          const services = await execQuery<Service[]>({qry: servicesQuerys.getList, values: [eventDate, eventDate]});
          return services;
     }


}