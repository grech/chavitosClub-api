export const servicesQuerys  = {
     getList:`SELECT s.id, s.name, s.description, IFNULL(b.price_mxn, 0) price, CASE WHEN EXISTS (SELECT 1 FROM event_services es JOIN event e ON e.id = es.event_id WHERE es.services_id = s.id AND e.date >= ? AND e.date <  DATE_ADD(?, INTERVAL 1 DAY) ) THEN 0 ELSE 1 END AS disponibility FROM services s left join service_price b on s.id = b.service_id `
}