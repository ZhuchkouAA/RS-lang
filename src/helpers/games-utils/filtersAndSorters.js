export const onlyStudying = (words) => words.filter((word) => word.optional.isStudying);

export const onlyHard = (words) => words.filter((word) => word.optional.isHard);

export const onlyNotDeleted = (words) => words.filter((word) => !word.optional.isDeleted);

<<<<<<< HEAD
export const dateFilter = (words) => words.filter((word) => Date.now() > word.optional.repeatDate);
=======
export const dateFilter = (words) => {
  return words.filter((word) => {
    return Date.now() > word.optional.repeatDate;
  });
};
>>>>>>> RSL-13: add words from queue

export const highPriorityFirstSorter = (words) =>
  words.sort(
    (
      { optional: { isHighPriority: isHighPriority1 } },
      { optional: { isHighPriority: isHighPriority2 } }
    ) => isHighPriority2 > isHighPriority1
  );

export const shuffle = (array) => {
  const newArray = array.slice(0, array.length);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
