declare module 'better-sqlite3' {
  export default class Database {
    constructor(file: string, options?: any);
    prepare(sql: string): any;
  }
}
