import { createConnection, Connection } from 'typeorm';

export default async function connect(): Promise<Connection> {
  const connection: Connection = await createConnection();
  return connection;
}
