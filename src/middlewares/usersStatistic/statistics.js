import { getCookie } from '../../helpers/cookies-utils';
import putWithTokenRequest from '../../helpers/fetch-utils/putWithToken-response';
import getWithTokenRequest from '../../helpers/fetch-utils/getWithToken-response';
import { rewriteProgress } from '../../redux/actions/creators/progress-data';
import { showMessage } from '../../redux/actions/creators/modalWindow-data';
import {
  isDateOfReceiptOfWordsCome,
  getNewDateOfReceiptOfWords,
  getNewLeftNewWordsToday,
  getNewLeftRepeatWordsToday,
  getNewQueueNewWords,
  getNewQueueRepeatWords,
  getQueueRandom300,
} from '../../helpers/getProgress-utils';
import store from '../../redux/redux-store';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

export const putProgress = () => async (dispatch) => {
  const {
    progress: {
      differentCardsShowedAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
    },
  } = store.getState();
  const body = JSON.stringify({
    learnedWords: 0,
    optional: {
      differentCardsShowedAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
    },
  });
  const url = API_URLS.USER_STATISTICS(getCookie(USER_ID));

  try {
    const rawResponse = await putWithTokenRequest(url, getCookie(TOKEN), body);
    if (!rawResponse.ok) {
      throw new Error('bad responce');
    } else {
      dispatch(showMessage('Прогресс синхронизирован с сервером'));
    }
  } catch (error) {
    dispatch(showMessage(error.message));
  }
};

export const getProgress = () => async (dispatch) => {
  const url = API_URLS.USER_STATISTICS(getCookie(USER_ID));

  try {
    const rawResponceProgress = await getWithTokenRequest(url, getCookie(TOKEN));
    const responseProgress = await rawResponceProgress.json();
    const { optional: progress } = responseProgress;
    const {
      differentCardsShowedAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
    } = progress;
    if (isDateOfReceiptOfWordsCome(dateOfReceiptOfWords)) {
      const newDateOfReceiptOfWords = getNewDateOfReceiptOfWords();
      const newLeftNewWordsToday = getNewLeftNewWordsToday();
      const newQueueNewWords = await getNewQueueNewWords(
        differentCardsShowedAllTime,
        newLeftNewWordsToday
      );
      const newQueueRepeatWords = await getNewQueueRepeatWords();
      const newLeftRepeatWordsToday = getNewLeftRepeatWordsToday();
      const queueRandom300 = await getQueueRandom300();
      dispatch(
        rewriteProgress({
          differentCardsShowedAllTime,
          dateOfReceiptOfWords: newDateOfReceiptOfWords,
          leftNewWordsToday: newLeftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          queueRandom300,
          leftRepeatWordsToday: newLeftRepeatWordsToday,
        })
      );
    } else {
      const newQueueNewWords = await getNewQueueNewWords(
        differentCardsShowedAllTime,
        leftNewWordsToday
      );
      const newQueueRepeatWords = await getNewQueueRepeatWords();
      const queueRandom300 = await getQueueRandom300();
      dispatch(
        rewriteProgress({
          differentCardsShowedAllTime,
          dateOfReceiptOfWords,
          leftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          queueRandom300,
          leftRepeatWordsToday,
        })
      );
    }
  } catch (error) {
    dispatch(showMessage(error.message));
  }
};
