import { envs } from "../../config/envs";

export const sueggestionQuerys = {
     createSuggestion: `insert into ${envs.DB}.contract_suggestions (id, contract_id, event_id, hours, payload_json, savings_mxn, status, created_at, expires_at) VALUES (?,?,?,?,?,?,?,?,?)`,
     findById: `SELECT * FROM ${envs.DB}.contract_suggestions WHERE id=?`,
     findByIdForUpdate: `SELECT * FROM ${envs.DB}.contract_suggestions WHERE id=? FOR UPDATE`,
     markAsApplied: `update ${envs.DB}.contract_suggestions set status = 'APPLIED', applied_at = ? where id = ? and status = 'PENDING'`,
     expire: `update ${envs.DB}.contract_suggestions set status = 'EXPIRED' where id = ? and status = 'PENDING'`
}