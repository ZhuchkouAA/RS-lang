import { connect } from 'react-redux';

import serverSynchronization from '../../middlewares/serverSynchronization';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import { updateProgressAfterWordProcessed } from '../../redux/actions/creators/progress-data';
import {
  withoutDeletedAndHard,
  onlyDeleted,
  onlyHard,
} from '../../helpers/games-utils/filtersAndSorters';

import DictionaryPage from './DictionaryPage';

const mapStateToProps = ({ progress: { queueRepeatWords }, loader: { isLoading } }) => {
  serverSynchronization();

  const userWords = queueRepeatWords;
  const learningWordsQueue = withoutDeletedAndHard(userWords);
  const deletedWordsQueue = onlyDeleted(userWords);
  const hardWordsQueue = onlyHard(userWords);

  return { isLoading, learningWordsQueue, hardWordsQueue, deletedWordsQueue };
};

const actionCreators = {
  serverSynchronization,
  finallySendWordAndProgress,
  updateProgressAfterWordProcessed,
};

export default connect(mapStateToProps, actionCreators)(DictionaryPage);
