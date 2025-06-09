import { inject, injectable } from 'inversify';

import { Command, DEFAULT_DB_PORT } from './index.js';
import {
  generateDetailedOffer, generateUser,
  getErrorMessage, getMongoURI
} from '../../../shared/helpers/index.js';
import { Database } from '../../../shared/libs/database/index.js';
import { TSVFileReader } from '../../../shared/libs/file-reader/index.js';
import { OfferService } from '../../../shared/libs/modules/offer/index.js';
import { UserService } from '../../../shared/libs/modules/user/index.js';
import { DetailedOffer , Component, User } from '../../../shared/types/index.js';


@injectable()
export class ImportCommand implements Command {
  private salt!: string;

  constructor(
    @inject(Component.Database) private database: Database,
    @inject(Component.DefaultUserService) private userService: UserService,
    @inject(Component.DefaultOfferService) private offerService: OfferService,
  ) {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const [
      title,
      description,
      postDate,
      cityName,
      cityLatitude,
      cityLongitude,
      preview,
      images,
      isPremium,
      isFavorite,
      placeType,
      rating,
      roomCount,
      guests,
      price,
      conveniences,
      name,
      email,
      avatarImage,
      password,
      userType,
      commentsCount,
      latitude,
      longitude,
    ] = this.parseLine(line);

    const user = generateUser(name, email, avatarImage, password, userType);
    const savedUser = await this.saveUser(user);

    const offerAuthorId = savedUser.id;

    const detailedOffer = generateDetailedOffer(
      title,
      description,
      postDate,
      cityName,
      cityLatitude,
      cityLongitude,
      preview,
      images,
      isPremium,
      isFavorite,
      placeType,
      rating,
      roomCount,
      guests,
      price,
      conveniences,
      offerAuthorId,
      commentsCount,
      latitude,
      longitude,
    );
    await this.saveOffer(detailedOffer);
    resolve();
  }

  private parseLine(line: string): string[] {
    return line.replace('\n', '').split('\t');
  }

  private onCompleteImport(count: number) {
    console.info(`Все ${count} строк успешно импортированы!`);

    this.database.disconnect();
  }

  private async saveUser(user: User) {
    return await this.userService.findOrCreate({
      name: user.name,
      email: user.email,
      avatarImage: user.avatarImage,
      password: user.password,
      userType: user.userType
    }, this.salt);
  }

  private async saveOffer(offer: DetailedOffer) {
    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: offer.city,
      preview: offer.preview,
      images: offer.images,
      isPremium: offer.isPremium,
      placeType: offer.placeType,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      price: offer.price,
      conveniences: offer.conveniences,
      location: offer.location,
      offerAuthor: offer.offerAuthor
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
