import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { RestConfig, Config, RestSchema } from '../shared/libs/config/index.js';
import { Database, MongoDatabase } from '../shared/libs/database/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { DefaultExceptionFilter, ExceptionFilter , HttpErrorExceptionFilter , ValidationExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { Component } from '../shared/types/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.PinoLogger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<Database>(Component.Database).to(MongoDatabase).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.DefaultExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
