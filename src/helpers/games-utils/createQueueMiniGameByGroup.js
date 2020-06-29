import getRequest from '../fetch-utils/getWithToken-response';
import { getCookie } from '../cookies-utils';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

import { shuffle } from './filtersAndSorters';

const createQueueMiniGameByGroup = async (group) => {
  const url = API_URLS.USER_AGGREGATED_WORDS_BY_USER_ID(getCookie(USER_ID), group);
  const rawQueueMiniGames = await getRequest(url, getCookie(TOKEN));
  const objectWithQueueMiniGames = await rawQueueMiniGames.json();

  const wordsArray = objectWithQueueMiniGames[0].paginatedResults;

  const queueMiniGamesWithCanonicalWords = wordsArray.map((el) => {
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

  return shuffle(queueMiniGamesWithCanonicalWords);
};

export default createQueueMiniGameByGroup;
