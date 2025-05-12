import { config } from 'dotenv';
import { inject, injectable } from 'inversify';

import { Config } from './config.interface.js';
import { configSchema, Schema } from './schema.js';
import { ComponentName } from '../../enums/index.js';
import { Logger } from '../logger/index.js';

@injectable()
export class RestConfig implements Config<Schema> {
  private readonly config: Schema;

  constructor(@inject(ComponentName.Logger) private readonly logger: Logger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        'Невозможно прочитать .env файл. Возможно, файл не существует.',
      );
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env файл найдем и успешно спаршен!');
  }

  public get<T extends keyof Schema>(key: T): Schema[T] {
    return this.config[key];
  }
}
