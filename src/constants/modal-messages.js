const infoTitle = 'Уведомление';
const errorTitle = 'Ошибка';

export const WORDS_END = {
  tittle: infoTitle,
  message:
    'Дневная норма изучения слов пройдена. Если остались еще силы, можно закрепить успех в играх. Или увеличить лимиты слов в настройках (при большом лимите новых слов, на повторение будет приходить также больше слов).',
};

export const HARD_WORDS_END = {
  tittle: infoTitle,
  message: 'Сложные слова закончились.',
};

export const MINIMUM_LIMIT_HINTS = {
  tittle: errorTitle,
  message:
    'Нельзя отключить сразу все основные подсказки: перевод слова, пример с использованием слова, значение слова.',
};
