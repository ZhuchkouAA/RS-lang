import { connect } from 'react-redux';
import WordPage from './WordPage';

import serverSynchronization from '../../middlewares/serverSynchronization';
import finallySendWordAndProgress from '../../middlewares/finallySendWordAndProgress';
import { onDeleteButton } from '../../redux/actions/creators/progress-data';

const mapStateToProps = ({ settings, progress }) => ({ settings, progress });

const mapDispatchToPeops = { serverSynchronization, finallySendWordAndProgress, onDeleteButton };

export default connect(mapStateToProps, mapDispatchToPeops)(WordPage);
