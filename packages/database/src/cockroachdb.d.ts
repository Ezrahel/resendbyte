declare module "cockroachdb" {
  import { Pool as PgPool, PoolConfig as PgPoolConfig, Client as PgClient } from "pg";

  export interface PoolConfig extends PgPoolConfig {
    application_name?: string;
  }

  export class Pool extends PgPool {
    constructor(config?: PoolConfig);
  }

  export class Client extends PgClient {}

  const cockroachdb: {
    Pool: typeof Pool;
    Client: typeof Client;
    Query: unknown;
    Connection: unknown;
    types: unknown;
    defaults: unknown;
  };

  export default cockroachdb;
}
