import { connect } from 'react-redux';

import serverSynchronization from '../../middlewares/serverSynchronization';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import {
  withoutDeletedAndHard,
  onlyDeleted,
  onlyHard,
  queueSortByNextRepeatDateAsc,
} from '../../helpers/games-utils/filtersAndSorters';

import DictionaryPage from './DictionaryPage';

const mapStateToProps = ({ progress: { queueRepeatWords }, loader: { isLoading } }) => {
  serverSynchronization();

  const userWords = queueRepeatWords;
  const learningWordsQueue = queueSortByNextRepeatDateAsc(withoutDeletedAndHard(userWords));
  const deletedWordsQueue = onlyDeleted(userWords);
  const hardWordsQueue = onlyHard(userWords);

  return { isLoading, learningWordsQueue, hardWordsQueue, deletedWordsQueue };
};

const actionCreators = {
  serverSynchronization,
  finallySendWordAndProgress,
};

export default connect(mapStateToProps, actionCreators)(DictionaryPage);
