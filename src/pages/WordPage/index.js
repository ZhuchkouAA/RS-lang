import { connect } from 'react-redux';
import WordPage from './WordPage';

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

const mapStateToProps = ({ settings, loader: { isLoading } }) => ({ settings, isLoading });

const mapDispatchToPeops = {
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

export default connect(mapStateToProps, mapDispatchToPeops)(WordPage);
