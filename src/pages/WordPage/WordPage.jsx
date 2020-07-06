import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import WORD_HANDLER_KEYS from '../../constants/keys';
import PATH from '../../constants/path';
import { WORDS_END } from '../../constants/modal-messages';

import WordCard from '../../components/WordCard';
import Dialog from '../../components/Dialog';

import wordHandler from '../../helpers/games-utils/wordHandler';

const WordPage = ({
  settings,
  serverSynchronization,
  finallySendWordAndProgress,
  differentCardPlusOne,
  cardsShowedAllTimeIncrease,
  cardsShowedStatisticIncrease,
  rightAnswersAllTimeIncrease,
  longestTodaySeriesIncrease,
  longestTodaySeriesReset,
  learnedWordsStatisticIncrease,
  newCardsShowedStatisticIncrease,
  rightAnswersStatisticIcrease,
  reduceLeftNewWordsToday,
  reduceLeftRepeatWordsToday,
  isLoading,
  wordsQueue,
  isDemoQueue,
}) => {
  const history = useHistory();

  useEffect(() => {
    serverSynchronization();
  }, []);

  const onDeleteButton = async (word) => {
    if (word.optional.isMethodPost) {
      await differentCardPlusOne();
    } else {
      await cardsShowedAllTimeIncrease();
    }

    await cardsShowedStatisticIncrease();

    const updatedWord = wordHandler(word, [{ key: WORD_HANDLER_KEYS.isDeleted, value: true }]);

    finallySendWordAndProgress(updatedWord);
  };

  const onHardButton = async (word) => {
    finallySendWordAndProgress(word);
  };

  const onCheckEnteredWord = async (word, isFailsExist, newWordDifficulty) => {
    const deltaDifficulty = newWordDifficulty - word.difficulty;
    const updatedWord = wordHandler(word, [
      { key: WORD_HANDLER_KEYS.difficulty, value: deltaDifficulty },
      { key: WORD_HANDLER_KEYS.countRepeatsWordAllTime, value: 1 },
      { key: WORD_HANDLER_KEYS.isHighPriority, value: false },
    ]);
    await cardsShowedAllTimeIncrease();
    await cardsShowedStatisticIncrease();

    const isWordNew = word.optional.isMethodPost;

    if (isWordNew) {
      await differentCardPlusOne();
      await reduceLeftNewWordsToday();
      await newCardsShowedStatisticIncrease();
    }

    if (!isWordNew) {
      await reduceLeftRepeatWordsToday();
    }

    if (isFailsExist) {
      await longestTodaySeriesReset();
    }

    if (!isFailsExist) {
      await rightAnswersAllTimeIncrease();
      await longestTodaySeriesIncrease();
      await rightAnswersStatisticIcrease();
    }

    const isWordStudying = word.optional.isStudying;

    if (!isWordStudying) {
      await learnedWordsStatisticIncrease();
    }

    finallySendWordAndProgress(updatedWord);
  };

  const onVoteButton = async (word, newWordDifficulty, isRepeat) => {
    const deltaDifficulty = newWordDifficulty - word.difficulty;

    const now = Date.now();
    if (isRepeat) {
      const updatedWord = wordHandler(word, [
        { key: WORD_HANDLER_KEYS.difficulty, value: deltaDifficulty },
        { key: WORD_HANDLER_KEYS.isHighPriority, value: true },
        { key: WORD_HANDLER_KEYS.repeatDate, value: now },
      ]);

      finallySendWordAndProgress(updatedWord);
    } else {
      const updatedWord = wordHandler(word, [
        { key: WORD_HANDLER_KEYS.difficulty, value: deltaDifficulty },
      ]);

      finallySendWordAndProgress(updatedWord);
    }
  };

  const redirectToMainPage = () => {
    history.push(PATH.MAIN);
  };

  if (isLoading) {
    return <div />;
  }

  if (!isDemoQueue && wordsQueue.length === 0) {
    return (
      <Dialog
        isOpen
        type="info"
        tittle={WORDS_END.tittle}
        message={WORDS_END.message}
        callBack={redirectToMainPage}
      />
    );
  }

  return (
    <WordCard
      settings={settings}
      onDeleteButton={onDeleteButton}
      onHardButton={onHardButton}
      onCheckEnteredWord={onCheckEnteredWord}
      onVoteButton={onVoteButton}
      queue={wordsQueue}
      isDemoQueue={isDemoQueue}
    />
  );
};

WordPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
  differentCardPlusOne: PropTypes.func.isRequired,
  cardsShowedAllTimeIncrease: PropTypes.func.isRequired,
  cardsShowedStatisticIncrease: PropTypes.func.isRequired,
  rightAnswersAllTimeIncrease: PropTypes.func.isRequired,
  longestTodaySeriesIncrease: PropTypes.func.isRequired,
  longestTodaySeriesReset: PropTypes.func.isRequired,
  learnedWordsStatisticIncrease: PropTypes.func.isRequired,
  newCardsShowedStatisticIncrease: PropTypes.func.isRequired,
  rightAnswersStatisticIcrease: PropTypes.func.isRequired,
  reduceLeftNewWordsToday: PropTypes.func.isRequired,
  reduceLeftRepeatWordsToday: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDemoQueue: PropTypes.bool.isRequired,
  wordsQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WordPage;
