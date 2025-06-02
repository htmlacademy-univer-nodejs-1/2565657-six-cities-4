#!/usr/bin/env node
import 'reflect-metadata';

import { Container } from 'inversify';

import { CLIApplication ,
  createCliApplicationContainer
} from './cli/cli-application/index.js';
import { createOfferContainer } from './shared/libs/modules/offer/index.js';
import { createUserContainer } from './shared/libs/modules/user/index.js';
import { Component } from './shared/types/index.js';

function bootstrap() {
  const appContainer = Container.merge(
    createCliApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const application = appContainer.get<CLIApplication>(Component.CliApplication);
  application.init();
  application.processCommand(process.argv);
}

bootstrap();
