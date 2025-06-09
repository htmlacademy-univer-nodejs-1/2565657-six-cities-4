import cors from 'cors';
import express, { Express } from 'express';
import { inject, injectable } from 'inversify';

import {
  COMMENTS_ROUTE, LOCALHOST,
  OFFERS_ROUTE,
  STATIC_FILES_ROUTE,
  STATIC_UPLOAD_ROUTE,
  USERS_ROUTE
} from './rest.constants.js';
import { getMongoURI } from '../shared/helpers/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Database } from '../shared/libs/database/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Controller } from '../shared/libs/rest/controller/index.js';
import { ExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/index.js';
import { Component } from '../shared/types/index.js';

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
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.HttpErrorExceptionFilter) private readonly httpErrorExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
    @inject(Component.DefaultExceptionFilter) private readonly defaultExceptionFilter: ExceptionFilter,
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
    this.server.use(USERS_ROUTE, this.userController.router);
    this.server.use(OFFERS_ROUTE, this.offerController.router);
    this.server.use(COMMENTS_ROUTE, this.commentController.router);
  }

  private async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async _initExceptionFilters() {
    this.server.use(this.defaultExceptionFilter.catch.bind(this.defaultExceptionFilter));
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpErrorExceptionFilter.catch.bind(this.httpErrorExceptionFilter));
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
    this.logger.info(`Сервер запущен на порту: ${LOCALHOST}${this.config.get('PORT')}`);
  }
}
