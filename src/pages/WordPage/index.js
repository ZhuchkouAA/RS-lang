import { connect } from 'react-redux';
import WordPage from './WordPage';

import { onlyHard, shuffle } from '../../helpers/games-utils/filtersAndSorters';
import { createQueueOrdinary } from '../../helpers/games-utils/card-utils';
import serverSynchronization from '../../middlewares/serverSynchronization';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import {
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
} from '../../redux/actions/creators/progress-data';
import { resetPrevPage } from '../../redux/actions/creators/navBar-creator';

const defaultWord = {
  optional: {
    word: 'acre',
    wordTranslate: 'акр',
    transcription: '[éikər]',
    textMeaning: 'An <i>acre</i> is a unit for measuring area.',
    textMeaningTranslate: 'Акр - это единица измерения площади',
    textExample: 'They lived on a 150-<b>acre</b> farm.',
    textExampleTranslate: 'Они жили на 150-акровой ферме',
    image: 'files/01_1201.jpg',
    audio: 'files/01_1201.mp3',
    audioMeaning: 'files/01_1201_meaning.mp3',
    audioExample: 'files/01_1201_example.mp3',
  },
};

const mapStateToProps = ({
  settings,
  loader: { isLoading },
  progress: { queueRepeatWords },
  navBar: { isPrevPageDictionary },
}) => {
  let wordsQueue = [];
  let isDemoQueue = false;

  if (isPrevPageDictionary) {
    const userWords = queueRepeatWords;

    isDemoQueue = true;
    wordsQueue = shuffle(onlyHard(userWords));

    resetPrevPage();
  } else {
    wordsQueue = createQueueOrdinary();
  }

  wordsQueue = wordsQueue.length > 0 ? wordsQueue : [defaultWord];

  return { settings, isLoading, wordsQueue, isDemoQueue };
};

const actionCreators = {
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
};

export default connect(mapStateToProps, actionCreators)(WordPage);
