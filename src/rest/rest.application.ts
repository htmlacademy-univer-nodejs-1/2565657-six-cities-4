import { inject, injectable } from 'inversify';

import { Component } from '../shared/enums/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Приложение было инициализировано');
    this.logger.info(`Получите значение из env $PORT: ${this.config.get('PORT')}`);
  }
}
