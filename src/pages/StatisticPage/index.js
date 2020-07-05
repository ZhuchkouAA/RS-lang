import { connect } from 'react-redux';

import StatisticPage from './StatisticPage';
import serverSynchronization from '../../middlewares/serverSynchronization';

const mapStateToProps = ({ settings, progress, loader: { isLoading } }) => ({
  settings,
  progress,
  isLoading,
});

const actionCreators = { serverSynchronization };

export default connect(mapStateToProps, actionCreators)(StatisticPage);
