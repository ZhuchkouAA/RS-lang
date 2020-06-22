import { getCookie } from '../../helpers/cookies-utils';
import putWithTokenRequest from '../../helpers/fetch-utils/putWithToken-response';
import getWithTokenRequest from '../../helpers/fetch-utils/getWithToken-response';
import { rewriteProgress } from '../../redux/actions/creators/progress-data';
import { showMessage } from '../../redux/actions/creators/modalWindow-data';
import store from '../../redux/redux-store';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

export const putProgress = () => {
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

  return async (dispatch) => {
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
};

export const getProgress = () => {
  const url = API_URLS.USER_STATISTICS(getCookie(USER_ID));

  return async (dispatch) => {
    try {
      const rawResponceProgress = await getWithTokenRequest(url, getCookie(TOKEN));
      const responseProgress = await rawResponceProgress.json();
      const { optional: progress } = responseProgress;
      dispatch(rewriteProgress(progress));
    } catch (error) {
      dispatch(showMessage(error.message));
    }
  };
};
