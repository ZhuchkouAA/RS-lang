import { connect } from 'react-redux';

import SpeakIt from './SpeakIt';
import speakIt from '../../selectors/speakIt-selectors';

const mapStateToProps = (state) => ({
  wordsForGame: speakIt(state).wordsForGame,
});

export default connect(mapStateToProps)(SpeakIt);
