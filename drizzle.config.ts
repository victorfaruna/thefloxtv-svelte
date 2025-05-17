import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
config({ path: '.env' });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: { url: process.env.DATABASE_URL },
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
