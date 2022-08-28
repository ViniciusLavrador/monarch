/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    db: Db;
  }
  interface Db {
    softDelete: SoftDelete;
  }
  interface SoftDelete {
    models: string[];
  }
  export const config: Config;
  export type Config = IConfig;
}
