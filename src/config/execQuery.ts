import { sPool } from "./db";
import { RowDataPacket, PoolConnection } from "mysql2/promise";


export interface ExecQueryParams {
  qry: string;
  values?: any[];
  conn?: PoolConnection; // 👈 conexión opcional para usar dentro de una transacción
}

export const execQuery = async <
  T extends RowDataPacket[] = RowDataPacket[]
>(
  { qry, values = [], conn }: ExecQueryParams
): Promise<T> => {
  const connection = conn ?? await sPool().getConnection(); // usa la conexión pasada o crea una nueva

  try {
    const [rows] = await connection.execute<T>(qry, values);
    return rows;
  } finally {
    if (!conn) {
      // si no vino desde afuera, la cerramos aquí
      connection.release();
    }
  }
};
