const OK = 200;
const CREATED = 201;
const MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const BAD_REQUEST = 'Переданы некорректные данные';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const NOT_FOUND_MOVIE_ERROR = 'Нет фильма с таким id';
const NOT_FOUND_USER_ERROR = 'Пользователь по указанному _id не найден';
const NOT_FOUND_ERROR = 'Адреса по вашему запросу не существует';
const VALIDATION_ERROR = 'ValidationError';
const FORBIDDEN_DELETE_MOVIE = 'Нет прав на удаление карточки';
const OK_DELETE_MOVIE = 'Фильм успешно удален';
const SCHEMA_VALIDATE_MESSAGES_URL = 'ссылка должна быть валидной';
const SCHEMA_VALIDATE_MESSAGES_EMAIL = 'Неправильный формат почты';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_AUTH_ERROR_WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const CONFLICT_ERROR_EMAIL = 'Пользователь с таким email уже существует';
const REQUEST_LOG = 'request.log';
const ERROR_LOG = 'error.log';
const BEARER = 'Bearer ';
const PRODUCTION = 'production';
const DEV_SECRET = 'dev-secret';
const GOOD = 'Все работает как надо';

module.exports = {
  OK,
  CREATED,
  MONGO_URL,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  NOT_FOUND_USER_ERROR,
  VALIDATION_ERROR,
  FORBIDDEN_DELETE_MOVIE,
  OK_DELETE_MOVIE,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR_EMAIL,
  NOT_AUTH_ERROR,
  NOT_AUTH_ERROR_WRONG_EMAIL_OR_PASSWORD,
  SCHEMA_VALIDATE_MESSAGES_URL,
  SCHEMA_VALIDATE_MESSAGES_EMAIL,
  REQUEST_LOG,
  ERROR_LOG,
  BEARER,
  PRODUCTION,
  DEV_SECRET,
  GOOD,
};
