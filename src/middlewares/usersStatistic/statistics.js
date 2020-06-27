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
  array15FromString,
  newArray15FromString,
} from '../../helpers/getProgress-utils';
import store from '../../redux/redux-store';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

export const putProgress = () => async (dispatch) => {
  const {
    progress: {
      differentCardsShowedAllTime,
      cardsShowedAllTime,
      rightAnswersAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
      cardsShowedToday,
      rightTodayAnswers,
      longestTodaySeries,
      learnedWords15Days,
      cardsShowed15Days,
      newCardsShowed15Days,
      rightAnswers15Days,
    },
  } = store.getState();

  const body = JSON.stringify({
    learnedWords: 0,
    optional: {
      differentCardsShowedAllTime,
      cardsShowedAllTime,
      rightAnswersAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
      cardsShowedToday,
      rightTodayAnswers,
      longestTodaySeries,
      learnedWords15Days: learnedWords15Days.join('-'),
      cardsShowed15Days: cardsShowed15Days.join('-'),
      newCardsShowed15Days: newCardsShowed15Days.join('-'),
      rightAnswers15Days: rightAnswers15Days.join('-'),
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
      cardsShowedAllTime,
      rightAnswersAllTime,
      dateOfReceiptOfWords,
      leftNewWordsToday,
      leftRepeatWordsToday,
      cardsShowedToday,
      rightTodayAnswers,
      longestTodaySeries,
      learnedWords15Days,
      cardsShowed15Days,
      newCardsShowed15Days,
      rightAnswers15Days,
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
          cardsShowedAllTime,
          rightAnswersAllTime,
          dateOfReceiptOfWords: newDateOfReceiptOfWords,
          leftNewWordsToday: newLeftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          queueRandom300,
          leftRepeatWordsToday: newLeftRepeatWordsToday,
          cardsShowedToday: 0,
          rightTodayAnswers: 0,
          longestTodaySeries: 0,
          learnedWords15Days: newArray15FromString(learnedWords15Days),
          cardsShowed15Days: newArray15FromString(cardsShowed15Days),
          newCardsShowed15Days: newArray15FromString(newCardsShowed15Days),
          rightAnswers15Days: newArray15FromString(rightAnswers15Days),
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
          cardsShowedAllTime,
          rightAnswersAllTime,
          dateOfReceiptOfWords,
          leftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          queueRandom300,
          leftRepeatWordsToday,
          cardsShowedToday,
          rightTodayAnswers,
          longestTodaySeries,
          learnedWords15Days: array15FromString(learnedWords15Days),
          cardsShowed15Days: array15FromString(cardsShowed15Days),
          newCardsShowed15Days: array15FromString(newCardsShowed15Days),
          rightAnswers15Days: array15FromString(rightAnswers15Days),
        })
      );
    }
  } catch (error) {
    dispatch(showMessage(error.message));
  }
};
