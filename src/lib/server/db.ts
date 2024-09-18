import { dev } from '$app/environment';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
config({ path: '.env' });
const client = dev
	? postgres(process.env.DATABASE_URL!)
	: postgres(process.env.DATABASE_URL!, { ssl: 'require' });
export const db = drizzle(client, {});
