import { connect } from 'react-redux';

<<<<<<< HEAD
<<<<<<< HEAD
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
=======
>>>>>>> RSL-34: add word queue
=======
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
>>>>>>> RLS-34: add styles, impruve statistic
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

<<<<<<< HEAD
export default connect(mapStateToProps)(SavannaPage);
>>>>>>> RSL-34: add word queue
=======
const actionCreators = {
  finallySendWordAndProgress,
};

export default connect(mapStateToProps, actionCreators)(SavannaPage);
>>>>>>> RLS-34: add styles, impruve statistic
