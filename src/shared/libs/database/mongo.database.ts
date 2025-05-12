import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';

import { Database } from './index.js';
import { ComponentName } from '../../enums/index.js';
import { Logger } from '../logger/index.js';
import { setTimeout } from 'node:timers/promises';

const MAX_REPEAT_COUNT = 4;
const REPEAT_DELAY = 1200;

@injectable()
export class MongoDatabase implements Database {
  private mongoose!: typeof Mongoose;
  private isDbConnected: boolean;

  constructor(
    @inject(ComponentName.Logger) private readonly logger: Logger
  ) {
    this.isDbConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isDbConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('Уже есть соединение с базой данных!');
    }

    this.logger.info('Идет подключение к базе данных...');

    let repeatCount = 0;
    while (repeatCount < MAX_REPEAT_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isDbConnected = true;
        this.logger.info('Соединение с базой успешно установлено!');
        return;
      } catch (error) {
        repeatCount++;
        this.logger.error(`Не получилось установить соединение, идет попытка ${repeatCount}`, error as Error);
        await setTimeout(REPEAT_DELAY);
      }
    }

    throw new Error(`Не получилось установить соединение... превышено максимальное количество попыток ${MAX_REPEAT_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Соединение еще не установлено!');
    }

    await this.mongoose.disconnect?.();
    this.isDbConnected = false;
    this.logger.info('Соединение с базой данных разорвано');
  }
}
