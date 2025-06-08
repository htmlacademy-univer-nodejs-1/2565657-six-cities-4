import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import { getMongoURI } from '../shared/helpers/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Database } from '../shared/libs/database/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Controller , ExceptionFilter } from '../shared/libs/rest/index.js';
import { Component } from '../shared/types/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly database: Database,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.DefaultExceptionFilter) private readonly defaultExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter
  ) {
    this.server = express();
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

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async _initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.defaultExceptionFilter.catch.bind(this.defaultExceptionFilter));
  }

  public async init() {
    this.logger.info('Приложение было инициализировано!');

    this.logger.info('Инициализация базы данных...');
    await this._initDb();
    this.logger.info('База данных успешно инициализирована');

    this.logger.info('Регистрация Middleware...');
    await this._initMiddleware();
    this.logger.info('Регистрация Middleware завершена');

    this.logger.info('Запущена инициализация контроллеров...');
    await this._initControllers();
    this.logger.info('Инициализация контроллеров завершена');

    this.logger.info('Запущена инициализация фильтров ошибок...');
    await this._initExceptionFilters();
    this.logger.info('Инициализация фильтров ошибок завершена...');

    this.logger.info('Попытка инициализировать сервер...');
    await this._initServer();
    this.logger.info(`Сервер запущен на порту: http://localhost:${this.config.get('PORT')}`);
  }
}
