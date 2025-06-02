import { inject, injectable } from 'inversify';

import { CommandParser } from './command-parser.js';
import { Command } from './commands/command.interface.js';
import { Component } from '../../shared/types/index.js';

type CommandCollection = Record<string, Command>;

@injectable()
export class CLIApplication {
  private commands: CommandCollection = {};
  private readonly defaultCommand: string = '--help';

  constructor(
    @inject(Component.ImportCommand) private readonly importCommand: Command,
    @inject(Component.GenerateCommand) private readonly generateCommand: Command,
    @inject(Component.HelpCommand) private readonly helpCommand: Command,
    @inject(Component.VersionCommand) private readonly versionCommand: Command
  ) {}

  public init() {
    const commandList = [this.importCommand, this.generateCommand, this.helpCommand, this.versionCommand];

    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Команда ${command.getName()} уже зарегистрирована`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `Команда по умолчанию (${this.defaultCommand}) не зарегистрирована`,
      );
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
