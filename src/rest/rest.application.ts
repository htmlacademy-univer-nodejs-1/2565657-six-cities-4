//import { Express } from 'express';
import { inject, injectable } from 'inversify';

import { getMongoURI } from '../shared/helpers/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Database } from '../shared/libs/database/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  //private server: Express;

  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly database: Database
  ) {
    //this.server = exports();
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.database.connect(mongoUri);
  }

  // private async _initServer() {
  //   const port = this.config.get('PORT');
  //   this.server.listen(port);
  // }

  public async init() {
    this.logger.info('Приложение было инициализировано!');

    this.logger.info('Инициализация базы данных...');
    await this._initDb();
    this.logger.info('База данных успешно инициализирована');

    this.logger.info(`Получите значение из env $PORT: ${this.config.get('PORT')}`);

    // this.logger.info('Попытка инициализировать сервер...');
    // await this._initServer();
    // this.logger.info(`Сервер запущен на порту: http://localhost:${this.config.get('PORT')}`);
  }
}
