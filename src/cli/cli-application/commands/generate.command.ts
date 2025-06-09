import got from 'got';
import { injectable } from 'inversify';

import { Command, DEFAULT_RADIX } from './index.js';
import { TSVFileWriter } from '../../../shared/libs/file-writer/index.js';
import { TsvDataGenerator } from '../../../shared/libs/offer-generator/index.js';
import { MockServerData } from '../../mocks/index.js';

@injectable()
export class GenerateCommand implements Command {
  private initialData: MockServerData;

  public getName(): string {
    return '--generate';
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Невозможно загрузить данные из ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvDataGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, DEFAULT_RADIX);

    try {
      await this.load(url);
      console.log('Данные загружены:', this.initialData);
      await this.write(filepath, offerCount);
      console.info(`Файл ${filepath} с данными был успешно сгенерирован :)`);
    } catch (error: unknown) {
      console.log('Не получилось сгенерировать данные');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
