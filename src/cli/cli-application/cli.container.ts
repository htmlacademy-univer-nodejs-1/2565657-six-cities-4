import { Container } from 'inversify';

import { Command, GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './commands/index.js';
import { CLIApplication } from './index.js';
import { Database, MongoDatabase } from '../../shared/libs/database/index.js';
import { ConsoleLogger, Logger, PinoLogger } from '../../shared/libs/logger/index.js';
import { Component } from '../../shared/types/index.js';

export function createCliApplicationContainer() {
  const cliApplicationContainer = new Container();

  cliApplicationContainer.bind<CLIApplication>(Component.CliApplication).to(CLIApplication).inSingletonScope();
  cliApplicationContainer.bind<Command>(Component.ImportCommand).to(ImportCommand).inSingletonScope();
  cliApplicationContainer.bind<Command>(Component.GenerateCommand).to(GenerateCommand).inSingletonScope();
  cliApplicationContainer.bind<Command>(Component.VersionCommand).to(VersionCommand).inSingletonScope();
  cliApplicationContainer.bind<Command>(Component.HelpCommand).to(HelpCommand).inSingletonScope();

  cliApplicationContainer.bind<Logger>(Component.ConsoleLogger).to(ConsoleLogger).inSingletonScope();
  cliApplicationContainer.bind<Logger>(Component.PinoLogger).to(PinoLogger).inSingletonScope();

  cliApplicationContainer.bind<Database>(Component.Database).to(MongoDatabase).inSingletonScope();

  return cliApplicationContainer;
}
