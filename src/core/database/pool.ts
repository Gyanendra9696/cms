import { Pool, type PoolConfig } from 'pg';

// 1. Configuration Validation
const requiredEnv = ['DATABASE_URL'];
requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`);
  }
});

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.POOL_MAX || '20', 10),
  idleTimeoutMillis: parseInt(process.env.POOL_IDLE_TIMEOUT || '30000', 10),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
};

export const pool = new Pool(poolConfig);

// 2. Logging instead of process.exit
pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected error on idle client', err);
});

// 3. Health Check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database connection health check failed', err);
    return false;
  }
}

// 4. Graceful Shutdown
export async function shutdownDatabasePool(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('Shutting down database pool...');
  await pool.end();
  // eslint-disable-next-line no-console
  console.log('Database pool drained.');
}
