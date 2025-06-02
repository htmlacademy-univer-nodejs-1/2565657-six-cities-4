import { Expose, Type } from 'class-transformer';

import { LocationRdo } from './location.rdo.js';
import { CityName } from '../../../../enums/index.js';

export class CityRdo {
  @Expose()
  public name!: CityName;

  @Expose()
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
