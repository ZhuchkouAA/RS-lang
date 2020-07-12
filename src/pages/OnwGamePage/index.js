import { connect } from 'react-redux';
import OnwGamePage from './OnwGamePage';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';

const mapStateToProps = ({ gameModeData: { words, mode } }) => ({
  words,
  mode,
});

const actionCreators = { finallySendWordAndProgress };

export default connect(mapStateToProps, actionCreators)(OnwGamePage);
