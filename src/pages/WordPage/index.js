import { connect } from 'react-redux';
import WordPage from './WordPage';

import serverSynchronization from '../../middlewares/serverSynchronization';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import { updateProgressAfterWordProcessed } from '../../redux/actions/creators/progress-data';

const mapStateToProps = ({ settings, loader: { isLoading } }) => ({ settings, isLoading });

const mapDispatchToPeops = {
  serverSynchronization,
  finallySendWordAndProgress,
  updateProgressAfterWordProcessed,
};

export default connect(mapStateToProps, mapDispatchToPeops)(WordPage);
