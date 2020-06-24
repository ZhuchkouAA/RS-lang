export const onlyReadyWords = (words) => {
  words.filter((word) => {
    return word.optional.repeatDate < Date.now();
  });
};

export const onlyStudying = (words) => {
  words.filter((word) => {
    return word.optional.isStudying;
  });
};

export const onlyHard = (words) => {
  words.filter((word) => {
    return word.optional.isHard;
  });
};

export const onlyDeleted = (words) => {
  words.filter((word) => {
    return word.optional.isDeleted;
  });
};
