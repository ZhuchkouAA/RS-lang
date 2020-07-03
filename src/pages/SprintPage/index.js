import { connect } from 'react-redux';

import SprintPage from './SprintPage';
import sprintWordsQueue from '../../selectors/sprint-selectors';

const mapStateToProps = (state) => ({
  words: sprintWordsQueue(state),
});

export default connect(mapStateToProps)(SprintPage);
