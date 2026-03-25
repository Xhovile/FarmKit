import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Force IPv4 resolution to avoid ECONNREFUSED issues with IPv6 on some environments
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const hasDatabaseUrl = !!process.env.DATABASE_URL;

// Force IPv4 for local connections to avoid IPv6 ECONNREFUSED issues
const host = process.env.PGHOST === 'localhost' ? '127.0.0.1' : process.env.PGHOST;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: host,
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  // Enable SSL if in production OR if we have a DATABASE_URL that likely needs it
  ssl: isProduction || (hasDatabaseUrl && !process.env.DATABASE_URL?.includes('localhost') && !process.env.DATABASE_URL?.includes('127.0.0.1'))
    ? { rejectUnauthorized: false }
    : false,
});
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Testing database connection (attempt ${i + 1}/${retries})...`);
      // Simple query to test connection
      await pool.query('SELECT 1');
      console.log('Database connection successful.');

      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(schema);
      console.log('PostgreSQL database initialized successfully.');
      return; // Success, exit the loop
    } catch (error: any) {
      console.error(`Failed to initialize PostgreSQL database (attempt ${i + 1}/${retries}):`, error.message);
      
      if (i < retries - 1) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        if (error.code === 'ECONNREFUSED') {
          console.error('Connection refused. Please check if the database server is running and accessible.');
          console.error('If you are using a remote database, ensure that your IP is allowlisted or that the database allows connections from this environment.');
        }
        if (error.code === '28P01') {
          console.error('Invalid password. Please check your PGPASSWORD.');
        }
        throw error; // Final attempt failed, rethrow
      }
    }
  }
};

export default pool;
