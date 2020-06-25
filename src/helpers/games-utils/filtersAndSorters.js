export const onlyStudying = (words) => {
  return words.filter((word) => {
    return word.optional.isStudying;
  });
};

export const onlyHard = (words) => {
  return words.filter((word) => {
    return word.optional.isHard;
  });
};

export const onlyNotDeleted = (words) => {
  return words.filter((word) => {
    return !word.optional.isDeleted;
  });
};

export const dateFilter = (words) => {
  return words.filter((word) => {
    return Date.now() < word.optional.repeatDate;
  });
};

export const highPriorityFirstSorter = (words) => {
  return words.sort(
    (
      { optional: { isHighPriority: isHighPriority1 } },
      { optional: { isHighPriority: isHighPriority2 } }
    ) => {
      return isHighPriority2 > isHighPriority1;
    }
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
