import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remain = '';
    let nextLinePosition = -1;
    let rowCount = 0;

    for await (const chunk of readStream) {
      remain += chunk.toString();

      while ((nextLinePosition = remain.indexOf('\n')) >= 0) {
        const readyRow = remain.slice(0, nextLinePosition + 1);
        remain = remain.slice(++nextLinePosition);
        rowCount++;
        await new Promise((resolve) => {
          this.emit('line', readyRow, resolve);
        });
      }
    }
    this.emit('end', rowCount);
  }
}
