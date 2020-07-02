import { connect } from 'react-redux';

import StatisticPage from './StatisticPage';
import serverSynchronization from '../../middlewares/serverSynchronization';

const mapStateToProps = ({ settings, progress }) => ({ settings, progress });

const actionCreators = { serverSynchronization };

export default connect(mapStateToProps, actionCreators)(StatisticPage);
