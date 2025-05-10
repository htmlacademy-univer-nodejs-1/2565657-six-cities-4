import { Command } from './command.interface.js';
import {
  generateOffer,
  getErrorMessage,
} from '../../../shared/helpers/index.js';
import { TSVFileReader } from '../../../shared/libs/file-reader/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = generateOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`Все ${count} строк успешно импортированы!`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Не получилось импортировать данные из ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
