import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
  HOST: string;
  STATIC_DIRECTORY_PATH: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих соединений',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt для хэша пароля',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP адрес хоста базы данных (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: 'Имя пользователя в базе данных',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Пароль в базе данных',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Порт для соединения с базой данных',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Название базы данных',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Директория для загрузки файлов',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'секрет для JWT токенов',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Хост, на котором запущен сервер',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Путь до директории со статичными ресурсами',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: 'static'
  },
});
