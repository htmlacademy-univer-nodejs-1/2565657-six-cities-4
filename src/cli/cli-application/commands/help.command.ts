import chalk from 'chalk';

import { Command } from './command.interface.js';

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
            --version:                                # выводит номер версии приложения
            --help:                                   # выводит информацию о приложении и доступных командах
            --import <path>:                          # импортирует данные из TSV по указанному пути
            --generate: <count> <path> <SERVER_API>   # генерирует count моковых предложений
    `),
    );
  }
}
