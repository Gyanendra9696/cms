import type { QueryResult } from 'pg';
import { pool } from '../database/pool';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  roles: string[];
}

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT id, email, password_hash, roles FROM users WHERE email = $1';
    const result: QueryResult<User> = await pool.query<User>(query, [email]);
    return result.rows[0] ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const query = 'SELECT id, email, password_hash, roles FROM users WHERE id = $1';
    const result: QueryResult<User> = await pool.query<User>(query, [id]);
    return result.rows[0] ?? null;
  }
}
