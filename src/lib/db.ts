import path from 'path';

const filename: string = path.join(process.cwd(), 'barbies.db');

const db = require('better-sqlite3')(filename);

export function queryBarbieByCode(code: string) {
  code = code.toUpperCase();
  const stmt = db.prepare('SELECT * FROM barbies WHERE product_code = ?');
  return stmt.all(code);
}

export function getAllBarbies() {
  const stmt = db.prepare('SELECT * FROM barbies');
  return stmt.all();
}
