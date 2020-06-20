export const store = {
  isAutheticate: 'func',
  // весь settings берется при инициализации с сервера
  settings: {
    wordsPerDay: 'string: 0 - 3600',
    newWordsPerDay: 'string: 0 -3600',
    answerBtn: 'bool',
    delFromLearnBtn: 'bool',
    feedBackButtons: 'bool',
    image: 'bool',
    audio: 'bool',
    audioMeaning: 'bool',
    audioExample: 'bool',
    textMeaning: 'bool',
    textExample: 'bool',
    transcription: 'bool',
    wordTranslate: 'bool',
    textExampleTranslate: 'bool',
  },
  progress: {
    // это поле лежит на серваке и берется при инициализации и изменяется каждый раз (+1) когда человек изучил новую карточку
    differentCardsShowed: 'string: 0 - 3600',
    // это поле лежит на серваке, берется при инициализации и рассчитывается, либо оставаясь таким-же, либо заменяется на что-то типа Date.now
    // как дополнение можно его обновлять каждый раз при изменениях в настройках
    dateOfReceiptOfWords: 'date string',
    // это поле лежит на серваке и перезаписывается на сервер
    // либо когда человек изучил новую карточку, либо из поля progress.dateOfReceiptOfWords и settings.newWordsPerDay
    leftNewWordsToday: 'string: 0 - 3600',
    // это поле сформируется из данных (settings.newWordsPerDay, progress.differentCardsShowed, progress.leftNewWordsToday) и данных с сервера (получит небходимое число новых слов)
    queueNewWords: [{ word1: 'word1Data' }, { word2: 'word2Data' }],
    // это поле формирутеся при обработке всех слов userа (filter: difficult===0),
    // вернет все слова изучаемые, но не выученные до конца
    queueRepeatWords: [{ word1: 'word1Data' }, { word2: 'word2Data' }],
    // это просто длина progress.queueRepeatWords для progressBar
    leftRepeatWordsToday: 'string: 0 -3600',
  },
};

export const serverWord = {
  difficulties: 'string 0-100',
  optional: {
    repeatDate: 'repeatDate string',
  },
};

export const cokie = {
  userId: 'string',
  token: 'string',
  endedTokenDate: 'string',
};
