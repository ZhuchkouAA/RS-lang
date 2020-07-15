import { connect } from 'react-redux';

import AudioCallPage from './AudioCallPage';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import audioCallWordsQueue from '../../selectors/audioCall-selectors';

const mapStateToProps = (state) => ({
  wordsForRandom: audioCallWordsQueue(state).wordsForRandom,
  wordsForGame: audioCallWordsQueue(state).wordsForGame,
  mode: state.gameModeData.mode,
});

const actionCreators = { finallySendWordAndProgress };

export default connect(mapStateToProps, actionCreators)(AudioCallPage);
