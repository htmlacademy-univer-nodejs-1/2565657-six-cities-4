import chalk from 'chalk';
import { injectable } from 'inversify';

import { Command } from './index.js';

@injectable()
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(): Promise<void> {
    console.info(
      chalk.yellow(`
        Cli приложение для создания и обработки моковых данных.
        Пример запуска:
            cli.js --<command> [--arguments]
        Доступные команды:
            --version: # выводит номер версии приложения
            --help: # выводит информацию о приложении и доступных командах
            --generate: <count> <path> <SERVER_API> # генерирует count моковых предложений
            --import <path> <DB_USER> <DB_PASSWORD> <DB_HOST> <DB_NAME> <SALT>: # импортирует данные из TSV, используя базу данных
    `),
    );
  }
}
