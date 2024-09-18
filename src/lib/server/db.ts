import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';
import { config } from 'dotenv';
config({ path: '.env' });
const client = postgres(process.env.DATABASE_URL!, { ssl: 'require', port: 6543 });
export const db = drizzle(client, { schema });
