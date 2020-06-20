import { connect } from 'react-redux';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ testData }) => ({ testData });

export default connect(mapStateToProps)(SettingsPage);
