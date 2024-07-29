import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables
config();

export async function queryDatabase(query: string, params: any[]) {
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    await client.connect();
    const res = await client.query(query, params);
    await client.end();

    return res;
}
