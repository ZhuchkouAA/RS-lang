import { connect } from 'react-redux';

import { putSettings } from '../../middlewares/usersSettings/settings';
import hardReset from '../../middlewares/hardReset';
import serverSynchronization from '../../middlewares/serverSynchronization';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ settings }) => ({ settings });

const actionCreators = { putSettings, hardReset, serverSynchronization };

export default connect(mapStateToProps, actionCreators)(SettingsPage);
