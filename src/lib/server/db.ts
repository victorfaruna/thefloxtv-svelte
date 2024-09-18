import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from 'dotenv';
config({ path: '.env' });
const { DATABASE_URL }: any = process.env;
const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });
export const db = drizzle(client, {});
