import 'reflect-metadata';
import { Container } from 'inversify';

import { createApplicationContainer } from './rest/container.js';
import { Application } from './rest/index.js';
import { ComponentName } from './shared/enums/index.js';
import { createOfferContainer } from './shared/libs/modules/offer/index.js';
import { createUserContainer } from './shared/libs/modules/user/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<Application>(ComponentName.Application);
  await application.init();
}

bootstrap();
