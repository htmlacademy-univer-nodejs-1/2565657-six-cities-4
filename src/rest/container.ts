import { Container } from 'inversify';

import { Application } from './application.js';
import { ComponentName } from '../shared/enums/index.js';
import { RestConfig, Config, Schema } from '../shared/libs/config/index.js';
import { Database, MongoDatabase } from '../shared/libs/database/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';

export function createApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<Application>(ComponentName.Application).to(Application).inSingletonScope();
  restApplicationContainer.bind<Logger>(ComponentName.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<Schema>>(ComponentName.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<Database>(ComponentName.Database).to(MongoDatabase).inSingletonScope();

  return restApplicationContainer;
}
