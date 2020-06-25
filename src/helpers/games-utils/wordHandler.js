import WORD_REPEAT_INTERVAL from '../../constants/timing';
import WORD_HANDLER_KEYS from '../../constants/keys';

export const wordHandler = (word, option) => {
  const { difficulty, wordId, optional } = word;
  const newWord = { difficulty, wordId, optional };
  const [key, value] = option;

  if (key === WORD_HANDLER_KEYS.isHard) {
    newWord.optional.isHard = value;
  }

  if (newWord.optional.isHard === true) return newWord;

  if (key === WORD_HANDLER_KEYS.isDeleted) {
    newWord.optional.isDeleted = value;
  }

  if (key === WORD_HANDLER_KEYS.isHighPriority) {
    newWord.optional.isHighPriority = value;
  }

  if (key === WORD_HANDLER_KEYS.difficulty) {
    let newDifficulty = difficulty + value;
    if (newDifficulty <= 0) {
      newDifficulty = 0;
      newWord.isStudying = false;
    }
    newDifficulty = newDifficulty > 100 ? 100 : newDifficulty;
    newWord.difficulty = newDifficulty;
  }

  newWord.optional.repeatDate = Date.now() + WORD_REPEAT_INTERVAL * (101 - newWord.difficulty);

  return newWord;
};

export default wordHandler;
