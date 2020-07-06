import store from '../../redux/redux-store';
import { getNewLeftRepeatWordsToday } from '../getProgress-utils';

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
