declare module 'better-sqlite3' {
  interface Database {
    prepare: (sql: string) => Statement;
    exec: (sql: string) => void;
    transaction: (fn: Function) => Function;
    close: () => void;
  }

  interface Statement {
    run: (...params: any[]) => any;
    get: (...params: any[]) => any;
    all: (...params: any[]) => any[];
    iterate: (...params: any[]) => Iterator<any>;
  }

  interface DatabaseOptions {
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: Function;
  }

  function Database(filename: string, options?: DatabaseOptions): Database;
  
  export = Database;
}
