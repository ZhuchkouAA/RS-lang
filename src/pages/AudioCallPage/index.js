import { connect } from 'react-redux';

import AudioCallPage from './AudioCallPage';
import sprintWordsQueue from '../../selectors/sprint-selectors';

const mapStateToProps = (state) => ({
  words: sprintWordsQueue(state),
});

export default connect(mapStateToProps)(AudioCallPage);
