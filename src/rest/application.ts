import { inject, injectable } from 'inversify';

import { ComponentName } from '../shared/enums/index.js';
import { Config, Schema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

@injectable()
export class Application {
  constructor(
    @inject(ComponentName.Logger) private readonly logger: Logger,
    @inject(ComponentName.Config) private readonly config: Config<Schema>,
  ) {}

  public async init() {
    this.logger.info('Приложение было инициализировано!');
    this.logger.info(`Получите значение из env $PORT: ${this.config.get('PORT')}`);
  }
}
