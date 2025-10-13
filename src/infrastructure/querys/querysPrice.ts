import { envs } from "../../config/envs";

export const priceLookQuerys = {
     servicePriceQueryHours: `SELECT price_mxn AS price FROM ${envs.DB}.service_price WHERE service_id = ? AND ? BETWEEN hours_min AND hours_max AND (active_to IS NULL OR active_to >= CURDATE()) ORDER BY active_from DESC LIMIT 1`,
        getServiceId: `select service_id from ${envs.DB}.package_items WHERE package_id=?`,
        getPackagepriceHour: ` SELECT price_mxn AS price FROM ${envs.DB}.package_price WHERE package_id = ? AND ? BETWEEN hours_min AND hours_max AND (active_to IS NULL OR active_to >= CURDATE()) ORDER BY active_from DESC LIMIT 1` ,

}