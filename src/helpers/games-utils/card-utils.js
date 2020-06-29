import store from '../../redux/redux-store';
import getNewLeftRepeatWordsToday from '../getProgress-utils';

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

  const shortenedQueueRepeatWords = highPriorityFirstSorter(queueRepeatWords).slice(
    0,
    amountRepeatWords
  );
  const workingQueue = [...queueNewWords, ...shortenedQueueRepeatWords];
  const filteredWithOnlyStudying = onlyStudying(workingQueue);
  const filteredWithDateFilter = dateFilter(filteredWithOnlyStudying);
  const filteredWithOnlyNotDeleted = onlyNotDeleted(filteredWithDateFilter);
  const shuffledWorkingQueue = shuffle(filteredWithOnlyNotDeleted);

  return shuffledWorkingQueue;
};

export const createQueueOnlyHard = () => {
  const { queueRepeatWords } = store.getState().progress;
  const filteredWithOnlyHard = onlyHard(queueRepeatWords);
  const shuffledWorkingQueue = shuffle(filteredWithOnlyHard);

  return shuffledWorkingQueue;
};
