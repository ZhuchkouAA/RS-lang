import { connect } from 'react-redux';

import SprintPage from './SprintPage';
import sprintWordsQueue from '../../selectors/sprint-selectors';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import { putProgress } from '../../middlewares/usersStatistic/statistics';
import {
  increaseSprintAllAnswersStatistic,
  increaseSprintRightAnswersStatistic,
  trySetSprintMaxScoreStatistic,
} from '../../redux/actions/creators/progress-data';

const mapStateToProps = ({ gameModeData, gameModeData: { mode } }) => ({
  words: sprintWordsQueue(gameModeData),
  mode,
});

const actionCreators = {
  finallySendWordAndProgress,
  increaseSprintAllAnswersStatistic,
  increaseSprintRightAnswersStatistic,
  trySetSprintMaxScoreStatistic,
  putProgress,
};

export default connect(mapStateToProps, actionCreators)(SprintPage);
