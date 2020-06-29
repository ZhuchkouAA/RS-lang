import WORD_HANDLER_KEYS from '../../constants/keys';
import { MIN_DIFFICULTY, MAX_DIFFICULTY, WORD_REPEAT_INTERVAL } from '../../constants/wordConfig';

const wordHandler = (word, option) => {
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
    let newDifficulty = Number(difficulty) + value;
    if (newDifficulty <= MIN_DIFFICULTY) {
      newDifficulty = MIN_DIFFICULTY;
      newWord.isStudying = false;
    }
    newDifficulty = newDifficulty > MAX_DIFFICULTY ? MAX_DIFFICULTY : newDifficulty;
    newWord.difficulty = String(newDifficulty);
  }

  newWord.optional.repeatDate =
    Date.now() + WORD_REPEAT_INTERVAL * (MAX_DIFFICULTY + 1 - newWord.difficulty);

  return newWord;
};

export default wordHandler;
