import { connect } from 'react-redux';
import WordPage from './WordPage';

import serverSynchronization from '../../middlewares/serverSynchronization';

const mapStateToProps = ({ settings, progress }) => ({ settings, progress });

const mapDispatchToPeops = { serverSynchronization };

export default connect(mapStateToProps, mapDispatchToPeops)(WordPage);
