import { envs } from "../../config/envs";

export const eventQuerys = {
     insertEvenPAckage: `INSERT INTO ${envs.DB}.event_packages (id, event_id, package_id, quantity, subtotal) VALUES (UUID(), ?, ?, ?, ?)`,
     sumSubtotalsQuery: `SELECT COALESCE(SUM(subtotal),0) s FROM ${envs.DB}.event_packages WHERE event_id = ?`,
     sumServicesTotal: `SELECT COALESCE(SUM(subtotal),0) s FROM ${envs.DB}.event_services WHERE event_id = ?`
}