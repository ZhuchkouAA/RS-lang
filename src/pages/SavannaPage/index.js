import { connect } from 'react-redux';

import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import SavannaPage from './SavannaPage';
import savannaWordsQueue from '../../selectors/savanna-selectors';

const mapStateToProps = (state) => ({
  words: savannaWordsQueue(state),
  mode: state.gameModeData.mode,
});

const actionCreators = {
  finallySendWordAndProgress,
};

export default connect(mapStateToProps, actionCreators)(SavannaPage);
