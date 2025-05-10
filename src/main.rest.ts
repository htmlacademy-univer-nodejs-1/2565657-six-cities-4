import 'reflect-metadata';
import { Container } from 'inversify';

import { Application } from './rest/index.js';
import { Component } from './shared/enums/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const container = new Container();
  container
    .bind<Application>(Component.RestApplication)
    .to(Application)
    .inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();

  const application = container.get<Application>(Component.RestApplication);
  await application.init();
}

bootstrap();
