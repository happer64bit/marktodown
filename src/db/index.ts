import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from './schema';
import { Pool } from "pg";

const db = drizzle({
    client: new Pool({
        connectionString: process.env.DATABASE_URL as string,
        maxUses: 4
    }),
    schema: schema
})

export default db;
