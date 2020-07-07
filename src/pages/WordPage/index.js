import { connect } from 'react-redux';

import WordPage from './WordPage';

import { selectWordsQueue } from '../../helpers/games-utils/card-utils';
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

const mapStateToProps = ({ settings, loader: { isLoading }, navBar: { isPrevPageDictionary } }) => {
  const wordsQueue = selectWordsQueue(isPrevPageDictionary);
  resetPrevPage();

  return { settings, isLoading, wordsQueue };
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
  resetPrevPage,
};

export default connect(mapStateToProps, actionCreators)(WordPage);
