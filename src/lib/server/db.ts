import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';
import postgres from 'postgres';
const client = postgres(DATABASE_URL, { ssl: 'require', port: 5432 });
export const db = drizzle(client, { schema });
