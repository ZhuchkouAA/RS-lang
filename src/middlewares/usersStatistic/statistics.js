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
      learnedWordsStatistic,
      cardsShowedStatistic,
      newCardsShowedStatistic,
      rightAnswersStatistic,
      sprintAllAnswersStatistic,
      sprintRightAnswersStatistic,
      sprintMaxScoreStatistic,
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
      learnedWordsStatistic: learnedWordsStatistic.join('-'),
      cardsShowedStatistic: cardsShowedStatistic.join('-'),
      newCardsShowedStatistic: newCardsShowedStatistic.join('-'),
      rightAnswersStatistic: rightAnswersStatistic.join('-'),
      sprintAllAnswersStatistic: sprintAllAnswersStatistic.join('-'),
      sprintRightAnswersStatistic: sprintRightAnswersStatistic.join('-'),
      sprintMaxScoreStatistic: sprintMaxScoreStatistic.join('-'),
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
      learnedWordsStatistic,
      cardsShowedStatistic,
      newCardsShowedStatistic,
      rightAnswersStatistic,
      sprintAllAnswersStatistic,
      sprintRightAnswersStatistic,
      sprintMaxScoreStatistic,
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
      dispatch(
        rewriteProgress({
          differentCardsShowedAllTime,
          cardsShowedAllTime,
          rightAnswersAllTime,
          dateOfReceiptOfWords: newDateOfReceiptOfWords,
          leftNewWordsToday: newLeftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          leftRepeatWordsToday: newLeftRepeatWordsToday,
          cardsShowedToday: 0,
          rightTodayAnswers: 0,
          longestTodaySeries: 0,
          learnedWordsStatistic: newArray15FromString(learnedWordsStatistic),
          cardsShowedStatistic: newArray15FromString(cardsShowedStatistic),
          newCardsShowedStatistic: newArray15FromString(newCardsShowedStatistic),
          rightAnswersStatistic: newArray15FromString(rightAnswersStatistic),
          sprintAllAnswersStatistic: newArray15FromString(sprintAllAnswersStatistic),
          sprintRightAnswersStatistic: newArray15FromString(sprintRightAnswersStatistic),
          sprintMaxScoreStatistic: newArray15FromString(sprintMaxScoreStatistic),
        })
      );
    } else {
      const newQueueNewWords = await getNewQueueNewWords(
        differentCardsShowedAllTime,
        leftNewWordsToday
      );
      const newQueueRepeatWords = await getNewQueueRepeatWords();
      dispatch(
        rewriteProgress({
          differentCardsShowedAllTime,
          cardsShowedAllTime,
          rightAnswersAllTime,
          dateOfReceiptOfWords,
          leftNewWordsToday,
          queueNewWords: newQueueNewWords,
          queueRepeatWords: newQueueRepeatWords,
          leftRepeatWordsToday,
          cardsShowedToday,
          rightTodayAnswers,
          longestTodaySeries,
          learnedWordsStatistic: array15FromString(learnedWordsStatistic),
          cardsShowedStatistic: array15FromString(cardsShowedStatistic),
          newCardsShowedStatistic: array15FromString(newCardsShowedStatistic),
          rightAnswersStatistic: array15FromString(rightAnswersStatistic),
          sprintAllAnswersStatistic: array15FromString(sprintAllAnswersStatistic),
          sprintRightAnswersStatistic: array15FromString(sprintRightAnswersStatistic),
          sprintMaxScoreStatistic: array15FromString(sprintMaxScoreStatistic),
        })
      );
    }
  } catch (error) {
    dispatch(showMessage(error.message));
  }
};
