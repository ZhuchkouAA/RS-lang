import { connect } from 'react-redux';

import { putSettings } from '../../middlewares/usersSettings/settings';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps, {
  putSettings,
})(SettingsPage);
