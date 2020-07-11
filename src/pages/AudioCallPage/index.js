import { connect } from 'react-redux';

import AudioCallPage from './AudioCallPage';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import audioCallWordsQueue from '../../selectors/audioCall-selectors';

const mapStateToProps = (state) => ({
  words: audioCallWordsQueue(state),
});

const actionCreators = { finallySendWordAndProgress };

export default connect(mapStateToProps, actionCreators)(AudioCallPage);
