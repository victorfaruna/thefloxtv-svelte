import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';
import { config } from 'dotenv';
config({ path: '.env' });
const { DATABASE_URL }: any = process.env;
const client = postgres(DATABASE_URL, { port: 6543 });
export const db = drizzle(client, { schema });
