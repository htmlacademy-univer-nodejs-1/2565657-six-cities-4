#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication } from './cli/cli-application/cli-application.js';
import {
  GenerateCommand,
  HelpCommand,
  ImportCommand,
  VersionCommand,
} from './cli/cli-application/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
