import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constants.js';
import { Command } from './command.interface.js';
import {
  generateOffer,
  getErrorMessage, getMongoURI
} from '../../../shared/helpers/index.js';
import { Database, MongoDatabase } from '../../../shared/libs/database/index.js';
import { TSVFileReader } from '../../../shared/libs/file-reader/index.js';
import { ConsoleLogger, Logger } from '../../../shared/libs/logger/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../../shared/libs/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../../shared/libs/modules/user/index.js';
import { Offer } from '../../../shared/types/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private database: Database;
  private readonly logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.database = new MongoDatabase(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = generateOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`Все ${count} строк успешно импортированы!`);

    this.database.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.offerAuthor,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city.name,
      previewImage: offer.preview,
      images: offer.images,
      isPremium: offer.isPremium,
      placeType: offer.placeType,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      price: offer.price,
      conveniences: offer.conveniences,
      offerAuthor: user.id,
      location: offer.location,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.database.connect(uri);

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
