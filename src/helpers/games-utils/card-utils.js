import store from '../../redux/redux-store';

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
  const { wordsPerDay, newWordsPerDay } = store.getState().settings;
  const amountRepeatWords = wordsPerDay - newWordsPerDay;
  const shortenedQueueRepeatWords = highPriorityFirstSorter(queueRepeatWords).slice(
    0,
    amountRepeatWords
  );
  const workingQueue = queueNewWords.concat(shortenedQueueRepeatWords);

  return shuffle(onlyNotDeleted(dateFilter(onlyStudying(workingQueue))));
};

export const createQueueOnlyHard = () => {
  const { queueRepeatWords } = store.getState().progress;
  return shuffle(onlyHard(queueRepeatWords));
};
