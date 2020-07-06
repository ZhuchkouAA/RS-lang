import { connect } from 'react-redux';

<<<<<<< HEAD
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
=======
>>>>>>> RSL-34: add word queue
import SavannaPage from './SavannaPage';
import savannaWordsQueue from '../../selectors/savanna-selectors';

const mapStateToProps = (state) => ({
  words: savannaWordsQueue(state),
});
<<<<<<< HEAD

const actionCreators = {
  finallySendWordAndProgress,
};

export default connect(mapStateToProps, actionCreators)(SavannaPage);
=======

export default connect(mapStateToProps)(SavannaPage);
>>>>>>> RSL-34: add word queue
