import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import WORD_HANDLER_KEYS from '../../constants/keys';
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
  trySetLongestTodaySeries,
  learnedWordsStatisticIncrease,
  newCardsShowedStatisticIncrease,
  rightAnswersStatisticIcrease,
  reduceLeftNewWordsToday,
  reduceLeftRepeatWordsToday,
  isLoading,
  wordsQueue,
  resetPrevPage,
}) => {
  useEffect(() => {
    serverSynchronization();
  }, []);

  const onDeleteButton = async (word) => {
    if (word.optional.countRepeatsWordAllTime === 0) {
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

  const onCheckEnteredWord = async (word, isFailsExist, currentSeria) => {
    await cardsShowedAllTimeIncrease();
    await cardsShowedStatisticIncrease();

    const isWordNew = word.optional.countRepeatsWordAllTime === 1;

    if (isWordNew) {
      await differentCardPlusOne();
      await reduceLeftNewWordsToday();
      await newCardsShowedStatisticIncrease();
    }

    if (!isWordNew) {
      await reduceLeftRepeatWordsToday();
    }

    if (!isFailsExist) {
      await rightAnswersAllTimeIncrease();
      await rightAnswersStatisticIcrease();
      await trySetLongestTodaySeries(currentSeria);
    }

    const isWordStudying = word.optional.isStudying;

    if (!isWordStudying) {
      await learnedWordsStatisticIncrease();
    }

    finallySendWordAndProgress(word);
  };

  const onVoteButton = async (word) => {
    finallySendWordAndProgress(word);
  };

  if (isLoading) {
    return <div />;
  }

  if (!wordsQueue.isDemoQueue && wordsQueue.length === 0) {
    return (
      <Dialog
        isOpen
        type="info"
        tittle={WORDS_END.tittle}
        message={WORDS_END.message}
        isRedirectMain
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
      isDemoQueue={wordsQueue.isDemoQueue}
      resetPrevPage={resetPrevPage}
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
  trySetLongestTodaySeries: PropTypes.func.isRequired,
  learnedWordsStatisticIncrease: PropTypes.func.isRequired,
  newCardsShowedStatisticIncrease: PropTypes.func.isRequired,
  rightAnswersStatisticIcrease: PropTypes.func.isRequired,
  reduceLeftNewWordsToday: PropTypes.func.isRequired,
  reduceLeftRepeatWordsToday: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  wordsQueue: PropTypes.arrayOf(PropTypes.object).isRequired,
  resetPrevPage: PropTypes.func.isRequired,
};

export default WordPage;
