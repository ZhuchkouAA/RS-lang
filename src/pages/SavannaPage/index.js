import { connect } from 'react-redux';

import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import SavannaPage from './SavannaPage';
import savannaWordsQueue from '../../selectors/savanna-selectors';
import {
  increaseSavannaAllAnswersStatistic,
  increaseSavannaRightAnswersStatistic,
  increaseSavannaFullLiveStatistic,
} from '../../redux/actions/creators/progress-data';
import { putProgress } from '../../middlewares/usersStatistic/statistics';

const mapStateToProps = (state) => ({
  words: savannaWordsQueue(state),
  mode: state.gameModeData.mode,
});

const actionCreators = {
  finallySendWordAndProgress,
  increaseSavannaAllAnswersStatistic,
  increaseSavannaRightAnswersStatistic,
  increaseSavannaFullLiveStatistic,
  putProgress,
};

export default connect(mapStateToProps, actionCreators)(SavannaPage);
