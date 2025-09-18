import { PoolConnection } from "mysql2/promise";
import { sPool } from './db';

export const withTransaction = async <T>(
     work: (conn: PoolConnection) => Promise<T>
   ): Promise<T> => {
     const conn = await sPool().getConnection();
     try {
       // Opcional: nivel de aislamiento
       // await conn.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
       await conn.beginTransaction();
       const result = await work(conn);
       await conn.commit();
       return result;
     } catch (err) {
       await conn.rollback();
       throw err;
     } finally {
       conn.release();
     }
   };