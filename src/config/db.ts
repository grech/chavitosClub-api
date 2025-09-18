import mysql, { Pool } from "mysql2/promise";
import { envs } from "./envs";

let pool: Pool;

export const sPool = (): Pool => {
     if(!pool){
           pool = mysql.createPool({
               host: envs.DB_HOST,
               port: envs.DB_PORT,    
               user: envs.USER_DB,
               password: envs.PASS_DB,
               database: envs.DB,
               waitForConnections: true,
               maxIdle: 10,
               idleTimeout: 600000,
               queueLimit: 0,
               enableKeepAlive: true,
               keepAliveInitialDelay: 0,
               decimalNumbers: true,
               supportBigNumbers: true,
               bigNumberStrings: false,
          })
     }
     return pool;
}