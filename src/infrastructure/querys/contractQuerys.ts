import { envs } from "../../config/envs";

export const contractQuerys = {
     getServicePrices: `select price_mxn price from ${envs.DB}.service_price where service_id = ?`,
     createEvent: `insert into ${envs.DB}.event (id, address, createdate, customer_id, date, notes, pdf_path, schedule) VALUES (?,?,?,?,?,NULL,NULL,NULL)`,
     createService: `INSERT INTO ${envs.DB}.event_services (event_id, services_id, id, quantity, subtotal) VALUES (?,?,?,?,?)`,
     create: `INSERT INTO ${envs.DB}.contract (id, created_at, event_id, tax, subtotal, total) VALUES (?, NOW(), ?, ?, ?, ?)`,
     getContractById: `select * from ${envs.DB}.contract where id = ?`,
     updateTotals: `UPDATE ${envs.DB}.contract SET  tax=?, subtotal = ? ,total=? WHERE id=?`
}