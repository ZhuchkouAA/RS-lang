import { connect } from 'react-redux';

import { putSettings } from '../../middlewares/usersSettings/settings';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ settings }) => ({ settings });

const mapDispatchToProps = { putSettings };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
