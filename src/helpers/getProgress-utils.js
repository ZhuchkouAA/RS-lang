import store from '../redux/redux-store';
import { getCookie } from './cookies-utils';
import getRequest from './fetch-utils/getWithToken-response';
import { shuffle } from './games-utils/filtersAndSorters';
import API_URLS from '../constants/APIUrls';
import { USER_ID, TOKEN } from '../constants/cookiesNames';
import { MAX_DIFFICULTY } from '../constants/wordConfig';
import { MSEC_PER_DAY, COUNT_ALL_WORDS } from '../constants/common';

export const isDateOfReceiptOfWordsCome = (serverDate) => {
  return serverDate < Date.now();
};

export const getNewDateOfReceiptOfWords = () => {
  return Date.now() + MSEC_PER_DAY;
};

export const getNewLeftNewWordsToday = () => {
  const { newWordsPerDay } = store.getState().settings;

  return newWordsPerDay;
};

export const getNewLeftRepeatWordsToday = () => {
  const { wordsPerDay, newWordsPerDay } = store.getState().settings;
  return wordsPerDay - newWordsPerDay;
};

export const getNewQueueNewWords = async (differentCardsShowedAllTime, leftNewWordsToday) => {
  if (leftNewWordsToday === 0) return [];
  const WORDS_IN_GROUP = 600;
  const groupOfFirstWord = Math.floor(differentCardsShowedAllTime / WORDS_IN_GROUP);
  const groupOfLastWord = Math.floor(
    (differentCardsShowedAllTime + leftNewWordsToday) / WORDS_IN_GROUP
  );
  const isWeNeedAnotherGroup = groupOfFirstWord !== groupOfLastWord;
  const firstWordNumber = differentCardsShowedAllTime - WORDS_IN_GROUP * groupOfFirstWord;

  let wordsArray = [];

  // забираем слова из первой группы
  if (firstWordNumber <= leftNewWordsToday) {
    const rawWords = await fetch(API_URLS.GET_WORDS(groupOfFirstWord, 0, 100, WORDS_IN_GROUP));
    const words = await rawWords.json();
    const newWords = words.slice(firstWordNumber, firstWordNumber + leftNewWordsToday);
    wordsArray = [...wordsArray, ...newWords];
  } else {
    const rawWords = await fetch(API_URLS.GET_WORDS(groupOfFirstWord, 1, 100, firstWordNumber));
    const newWordsElongated = await rawWords.json();
    const newWords = newWordsElongated.slice(0, leftNewWordsToday);
    wordsArray = [...wordsArray, ...newWords];
  }

  // если надо,добираем слова из следующей группы
  if (isWeNeedAnotherGroup) {
    const lastWordNumberInAnotherGroup =
      (differentCardsShowedAllTime + leftNewWordsToday) % WORDS_IN_GROUP;
    const rawWords = await fetch(
      API_URLS.GET_WORDS(groupOfLastWord, 0, 100, lastWordNumberInAnotherGroup)
    );
    const newWords = await rawWords.json();
    wordsArray = [...wordsArray, ...newWords];
  }

  // преобразуем в стандартный вид serverWord
  return wordsArray.map((el) => {
    const { id, ...other } = el;
    return {
      difficulty: String(MAX_DIFFICULTY),
      wordId: id,
      optional: {
        repeatDate: 0,
        lastRepeatWordDate: 0,
        isStudying: true,
        isHard: false,
        isDeleted: false,
        isMethodPost: true,
        isHighPriority: false,
        countRepeatsWordAllTime: 0,
        ...other,
      },
    };
  });
};

export const getNewQueueRepeatWords = async () => {
  const url = API_URLS.USER_WORDS_BY_USER_ID(getCookie(USER_ID));
  const rawNewRepeatWords = await getRequest(url, getCookie(TOKEN));
  const newRepeatWords = await rawNewRepeatWords.json();
  return newRepeatWords;
};

export const getQueueRandom300 = async () => {
  const randomGroup = Math.round(Math.random() * 5);
  const randomPageOf300wWords = Math.round(Math.random());
  const WORDS_PER_PAGE = 300;
  const wordsPerExampleSentenceLTE = 100;
  const rawWords = await fetch(
    API_URLS.GET_WORDS(
      randomGroup,
      randomPageOf300wWords,
      wordsPerExampleSentenceLTE,
      WORDS_PER_PAGE
    )
  );
  const words = await rawWords.json();
  return shuffle(words);
};

export const array15FromString = (string) => {
  const arrayStr = [...string.split('-').slice(0, 15)];
  return arrayStr.map((el) => Number(el));
};

export const newArray15FromString = (string) => {
  const arrayStr = [0, ...string.split('-').slice(0, 14)];
  return arrayStr.map((el) => Number(el));
};

const PERCENTS = 100;

export const getCategoryPassedPercent = (currentValue, maxValue) => {
  if (maxValue === 0) return 0;

  if (currentValue > maxValue) return PERCENTS;

  return Math.round((currentValue / maxValue) * PERCENTS);
};

export const calcUserIndicatorState = (settings, progress) => {
  const { wordsPerDay, newWordsPerDay } = settings;
  const {
    differentCardsShowedAllTime,
    longestTodaySeries,
    leftNewWordsToday,
    rightAnswersStatistic,
    cardsShowedStatistic,
    newCardsShowedStatistic,
  } = progress;

  const leftNewWordsTodayPercent = Math.round(
    PERCENTS - getCategoryPassedPercent(leftNewWordsToday, newWordsPerDay)
  );

  const countRepeatWords = cardsShowedStatistic[0] - newCardsShowedStatistic[0];
  const repeatWordsTodayPercent =
    countRepeatWords > 0
      ? Math.round(getCategoryPassedPercent(countRepeatWords, wordsPerDay - newWordsPerDay))
      : 0;

  const rightAnswersStatisticPercent = getCategoryPassedPercent(
    rightAnswersStatistic[0],
    cardsShowedStatistic[0]
  );

  const longestTodaySeriesPercent = getCategoryPassedPercent(longestTodaySeries, wordsPerDay);

  const differentCardsShowedAllTimePercent = getCategoryPassedPercent(
    differentCardsShowedAllTime,
    COUNT_ALL_WORDS
  );

  return {
    leftNewWordsTodayPercent,
    repeatWordsTodayPercent,
    rightAnswersStatisticPercent,
    longestTodaySeriesPercent,
    differentCardsShowedAllTimePercent,
  };
};
