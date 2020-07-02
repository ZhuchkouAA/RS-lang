import getRequest from '../fetch-utils/getWithToken-response';
import { getCookie } from '../cookies-utils';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

import { shuffle } from './filtersAndSorters';

const getQueue600ByGroup = async (group) => {
  const url = API_URLS.USER_AGGREGATED_WORDS_BY_USER_ID(getCookie(USER_ID), group);
  const rawQueueMiniGames = await getRequest(url, getCookie(TOKEN));
  const objectWithQueue600 = await rawQueueMiniGames.json();

  const wordsArray = objectWithQueue600[0].paginatedResults;

  const queue600WithCanonicalWords = wordsArray.map((el) => {
    if (el.userWord !== undefined) {
      const { _id } = el;
      const { difficulty, optional } = el.userWord;
      const canonicalWord = { difficulty, optional, wordId: _id };

      return canonicalWord;
    }
    const { _id, ...optional } = { ...el };

    return {
      wordId: _id,
      difficulty: '100',
      optional: {
        repeatDate: 0,
        isStudying: true,
        isHard: false,
        isDeleted: false,
        isMethodPost: true,
        isHighPriority: false,
        ...optional,
      },
    };
  });

  return queue600WithCanonicalWords;
};

export const getQueueMiniGame600ByGroup = async (group) => {
  const queueMiniGamesWithCanonicalWords = await getQueue600ByGroup(group);

  return shuffle(queueMiniGamesWithCanonicalWords);
};

export const getQueueMiniGame20 = async (group, page) => {
  const WORDS_PER_PAGE = 20;
  const FIRST_WORD_NUMBER = WORDS_PER_PAGE * page;
  const LAST_WORD_NUMBER = WORDS_PER_PAGE * page + WORDS_PER_PAGE;

  const queueMiniGame600 = await getQueue600ByGroup(group);

  const queueMiniGame20 = queueMiniGame600.slice(FIRST_WORD_NUMBER, LAST_WORD_NUMBER);

  return shuffle(queueMiniGame20);
};