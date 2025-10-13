import { RowDataPacket } from "mysql2";

export interface Service extends RowDataPacket {
     id: number;
     name: string;
     description: string;
     price: number;
     disponibility: number; // bandera logica 0 o 1 para saver la disponibilidad del servicio la fecha consultada
}