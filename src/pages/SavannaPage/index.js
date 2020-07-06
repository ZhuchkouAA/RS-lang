import { connect } from 'react-redux';

import SavannaPage from './SavannaPage';
import savannaWordsQueue from '../../selectors/savanna-selectors';

const mapStateToProps = (state) => ({
  words: savannaWordsQueue(state),
});

export default connect(mapStateToProps)(SavannaPage);
