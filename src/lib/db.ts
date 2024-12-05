import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'barbies.db'));

export function queryBarbieByCode(code: string) {
  code = code.toUpperCase();
  const stmt = db.prepare('SELECT * FROM barbies WHERE product_code = ?');
  return stmt.all(code);
}

export function getAllBarbies() {
  const stmt = db.prepare('SELECT * FROM barbies');
  return stmt.all();
}
