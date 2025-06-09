import chalk from 'chalk';
import { injectable } from 'inversify';

import { Command, DEFAULT_ENCODING } from './index.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';


type PackageJSONConfig = {
  version: string;
};

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

@injectable()
export class VersionCommand implements Command {
  private readonly filePath: string = './package.json';

  constructor() {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), DEFAULT_ENCODING);
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Невозможно спарсить JSON контент');
    }

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
