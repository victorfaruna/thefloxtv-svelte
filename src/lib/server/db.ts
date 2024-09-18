import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';
import { config } from 'dotenv';
config({ path: '.env' });
const client = postgres(
	'postgresql://postgres.wjlwisuqqdkcqphjuvjt:nzJNx2FM4lFH0SKb@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
	{ ssl: 'require', port: 6543 }
);
export const db = drizzle(client, { schema });
