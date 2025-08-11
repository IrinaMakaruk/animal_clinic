import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'animals',
  connector: 'postgresql',
  url: 'postgres://eheqeuaz:WLbvY2YGV3STgTeM4hfV1vaFravGB74N@ruby.db.elephantsql.com:5432/eheqeuaz',
  host: '	ruby.db.elephantsql.com',
  port: 5432,
  user: 'eheqeuaz',
  password: 'WLbvY2YGV3STgTeM4hfV1vaFravGB74N',
  database: 'eheqeuaz'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AnimalsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'animals';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.animals', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
