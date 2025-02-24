#!/usr/bin/env ts-node

import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { dirname } from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

program
  .command('help')
  .description('Выводит информацию о списке поддерживаемых команд.')
  .action(() => {
    console.log(chalk.green.bold('Список команд:'));
    console.log(`${chalk.bold('--help') }: выводит информацию о командах.`);
    console.log(`${chalk.bold('--version') }: выводит информацию о версии приложения.`);
    console.log(`${chalk.bold('--import <file>') }: импортирует данные из *.tsv-файла.`);
  });

program
  .command('version')
  .description('Выводит информацию о версии приложения.')
  .action(() => {
    console.log(chalk.yellow(`Версия приложения: ${packageJson.version}`));
  });

program
  .command('import <file>')
  .description('Импортирует данные из *.tsv-файла.')
  .action((file: string) => {
    if (!file.endsWith('.tsv')) {
      console.log(chalk.red('Ошибка: файл должен иметь расширение .tsv'));
      return;
    }

    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        console.log(chalk.red('Ошибка при чтении файла:', err.message));
        return;
      }
      console.log(chalk.green('Данные из файла:'));
      console.log(data);
    });
  });

program
  .arguments('<command> [args...]')
  .action((command, args) => {
    console.log(chalk.red(`Ошибка: команда "${command}" не найдена.`));
    if (args.length > 0) {
      console.log(chalk.gray(`Дополнительные аргументы: ${args.join(' ')}`));
    }

    program.outputHelp();
  });

program.parse(process.argv);
