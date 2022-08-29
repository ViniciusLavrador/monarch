/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    db: Db
    client: Client
  }
  interface Client {
    features: Features
  }
  interface Features {
    simple_navigation_enabled: boolean
  }
  interface Db {
    softDelete: SoftDelete
  }
  interface SoftDelete {
    models: string[]
  }
  export const config: Config
  export type Config = IConfig
}
