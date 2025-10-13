import { Service } from "../entities/Service";


export interface IServiceRepository {
     getListServices(eventDate: Date): Promise<Service[]>
}