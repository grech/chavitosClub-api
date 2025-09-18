import { envs } from "../../config/envs";

export const customerQuerys = {
     getByEmailOrRfc: `select id, name, phone, email, rfc from ${envs.DB}.customer where email =? or rfc = ? limit 1`,
     create: `insert into ${envs.DB}.customer (id, name, phone, email, rfc) values (?,?,?,?,?)`
}