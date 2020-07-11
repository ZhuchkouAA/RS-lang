import store from '../../redux/redux-store';

import { getNewLeftRepeatWordsToday } from '../getProgress-utils';
import { resetPrevPage } from '../../redux/actions/creators/navBar-creator';
import {
  highPriorityFirstSorter,
  shuffle,
  onlyHard,
  dateFilter,
  onlyNotDeleted,
  onlyStudying,
} from './filtersAndSorters';

export const createQueueOrdinary = () => {
  const { queueNewWords, queueRepeatWords } = store.getState().progress;
  const amountRepeatWords = getNewLeftRepeatWordsToday();

  const filteredWithHightPriority = highPriorityFirstSorter(queueRepeatWords);
  const filteredWithOnlyStudying = onlyStudying(filteredWithHightPriority);
  const filteredWithDateFilter = dateFilter(filteredWithOnlyStudying);
  const filteredWithOnlyNotDeleted = onlyNotDeleted(filteredWithDateFilter);
  const shuffledWorkingQueue = shuffle(filteredWithOnlyNotDeleted);
  const shortenedRepeatQueue = shuffledWorkingQueue.slice(0, amountRepeatWords);

  const workingQueue = [...shortenedRepeatQueue, ...queueNewWords];

  return workingQueue;
};

export const createQueueOnlyHard = () => {
  const { queueRepeatWords } = store.getState().progress;
  const filteredWithOnlyHard = onlyHard(queueRepeatWords);
  const shuffledWorkingQueue = shuffle(filteredWithOnlyHard);

  return shuffledWorkingQueue;
};

export const selectWordsQueue = (isPrevPageDictionary) => {
  const { queueRepeatWords } = store.getState().progress;

  let wordsQueue = [];
  let isDemoQueue = false;

  if (isPrevPageDictionary) {
    const userWords = queueRepeatWords;

    isDemoQueue = true;
    wordsQueue = shuffle(onlyHard(userWords));

    resetPrevPage();
  } else {
    wordsQueue = createQueueOrdinary();
  }

  wordsQueue = wordsQueue.length > 0 ? wordsQueue : [];

  wordsQueue.isDemoQueue = isDemoQueue;

  return wordsQueue;
};
