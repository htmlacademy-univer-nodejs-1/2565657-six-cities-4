import 'reflect-metadata';
import { Container } from 'inversify';

import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { createAuthContainer } from './shared/libs/modules/auth/auth.container.js';
import { createCommentContainer } from './shared/libs/modules/comment/index.js';
import { createOfferContainer } from './shared/libs/modules/offer/index.js';
import { createUserContainer } from './shared/libs/modules/user/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
