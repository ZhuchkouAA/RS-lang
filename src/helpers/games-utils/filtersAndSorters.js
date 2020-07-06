export const onlyStudying = (words) => words.filter((word) => word.optional.isStudying);

export const onlyLearned = (words) => words.filter((word) => !word.optional.isStudying);

export const onlyHard = (words) => words.filter((word) => word.optional.isHard);

export const onlyNotHard = (words) => words.filter((word) => !word.optional.isHard);

export const onlyDeleted = (words) => words.filter((word) => word.optional.isDeleted);

export const onlyNotDeleted = (words) => words.filter((word) => !word.optional.isDeleted);

export const withoutDeletedAndHard = (words) => onlyNotHard(onlyNotDeleted(words));

export const dateFilter = (words) => words.filter((word) => Date.now() > word.optional.repeatDate);

export const highPriorityFirstSorter = (words) => {
  const newWords = [...words];
  return newWords.sort(
    (
      { optional: { isHighPriority: isHighPriority1 } },
      { optional: { isHighPriority: isHighPriority2 } }
    ) => isHighPriority2 > isHighPriority1
  );
};

export const shuffle = (array) => {
  const newArray = array.slice(0, array.length);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const onlyLearnedWords = (words) => words.filter((word) => Number(word.difficulty) === 0);

export const queueSortByNextRepeatDateAsc = (queue) => {
  const comparer = (a, b) => {
    if (a.optional.repeatDate < b.optional.repeatDate) {
      return -1;
    }
    if (a.optional.repeatDate > b.optional.repeatDate) {
      return 1;
    }
    return 0;
  };

  return queue.sort(comparer);
};
