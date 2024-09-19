import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { DATABASE_URL } from '$env/static/private';
import postgres from 'postgres';
import { dev } from '$app/environment';
const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: true });
export const db = drizzle(client, { schema });
