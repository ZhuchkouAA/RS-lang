import WORD_HANDLER_KEYS from '../../constants/keys';
import { MIN_DIFFICULTY, MAX_DIFFICULTY, REPEAT_INTERVAL } from '../../constants/wordConfig';

const wordHandler = (word, options) => {
  const { difficulty, wordId, optional } = word;
  const newWord = { difficulty, wordId, optional };
  options.forEach(({ key, value }) => {
    if (key === WORD_HANDLER_KEYS.isMethodPost) {
      newWord.optional.isMethodPost = value;
    }

    if (key === WORD_HANDLER_KEYS.countRepeatsWordAllTime) {
      newWord.optional.countRepeatsWordAllTime += value;
    }

    if (key === WORD_HANDLER_KEYS.isHard) {
      newWord.optional.isHard = value;
    }

    if (key === WORD_HANDLER_KEYS.isDeleted) {
      newWord.optional.isDeleted = value;
    }

    if (key === WORD_HANDLER_KEYS.isHighPriority) {
      newWord.optional.isHighPriority = value;
    }

    if (key === WORD_HANDLER_KEYS.difficulty) {
      let newDifficulty = Number(difficulty) + value;
      if (newDifficulty <= MIN_DIFFICULTY) {
        newDifficulty = MIN_DIFFICULTY;
        newWord.isStudying = false;
      }

      newDifficulty = newDifficulty > MAX_DIFFICULTY ? MAX_DIFFICULTY : newDifficulty;
      newWord.difficulty = String(newDifficulty);
    }

    newWord.optional.lastRepeatWordDate = Date.now();

    // const interval =
    //   REPEAT_INTERVAL(newWord.difficulty) > MIN_REPEAT_INTERVAL
    //     ? REPEAT_INTERVAL(newWord.difficulty)
    //     : MIN_REPEAT_INTERVAL;

    const interval = REPEAT_INTERVAL(newWord.difficulty);

    newWord.optional.repeatDate = Date.now() + interval;

    if (key === WORD_HANDLER_KEYS.repeatDate) {
      newWord.optional.repeatDate = value;
    }
    return newWord;
  });

  return newWord;
};

export default wordHandler;
