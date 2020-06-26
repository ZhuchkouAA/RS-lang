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
  const filtered1WorkingQueue = onlyStudying(workingQueue);
  const filtered2WorkingQueue = dateFilter(filtered1WorkingQueue);
  const filtered3WorkingQueue = onlyNotDeleted(filtered2WorkingQueue);
  const shuffledWorkingQueue = shuffle(filtered3WorkingQueue);

  return shuffledWorkingQueue;
};

export const createQueueOnlyHard = () => {
  const { queueRepeatWords } = store.getState().progress;
  return shuffle(onlyHard(queueRepeatWords));
};
