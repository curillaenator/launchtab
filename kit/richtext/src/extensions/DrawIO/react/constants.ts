import type { DrawIoMessage } from './interfaces';

const DRAWIO_DUMMY_IMG = 'https://jobtech.jp/wp-content/uploads/draw-io.png';

const DRAWIO_FILE_TYPE = 'text/plain';
const DRAWIO_EVENTS: DrawIoMessage['event'][] = ['init', 'save', 'export', 'exit', 'autosave', 'prompt'];

const DEFAULT_FILE_NAME = 'Схема123';

const AVIOD_FILENAME_SYMBOLS = /[!@#$%^&*\\|,.?{}\[\]:;]/; // ok symbols  ()_+-

const DICT = {
  setFilename: 'Укажите название файла',

  avoidSymbols: 'Не используйте спец-символы в названиях',
  emptyFilename: 'Название не может быть пустым',
  somethingWrong: 'Что-то пошло не так при экспорте файла',

  error: 'Ошибка',
  ok: 'Понятно',
  save: 'Сохранить',
};

export { DRAWIO_EVENTS, DEFAULT_FILE_NAME, DRAWIO_FILE_TYPE, AVIOD_FILENAME_SYMBOLS, DICT, DRAWIO_DUMMY_IMG };
