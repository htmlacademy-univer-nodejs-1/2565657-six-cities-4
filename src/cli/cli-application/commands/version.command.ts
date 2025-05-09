import chalk from 'chalk';

import { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string;
};

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent = JSON.parse(jsonContent) as PackageJSONConfig;
    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.blue(`Текущая версия приложения: ${version}`));
    } catch (error) {
      console.error(
        chalk.red(`Ошибка получения данных о версии из ${this.filePath}`),
      );
    }
  }
}
