import { connect } from 'react-redux';

// import { putSettings } from '../../middlewares/usersSettings/settings';
import { getProgress } from '../../middlewares/usersStatistic/statistics';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ settings }) => ({ settings });

// const mapDispatchToProps = { putSettings };
const mapDispatchToProps = { getProgress };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
