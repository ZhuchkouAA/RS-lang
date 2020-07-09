import { connect } from 'react-redux';

import SprintPage from './SprintPage';
import sprintWordsQueue from '../../selectors/sprint-selectors';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';

const mapStateToProps = (state) => ({
  words: sprintWordsQueue(state),
});

const actionCreators = { finallySendWordAndProgress };

export default connect(mapStateToProps, actionCreators)(SprintPage);
