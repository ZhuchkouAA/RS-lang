import { connect } from 'react-redux';

import ProgressBar from './ProgressBar';

const mapStateToProps = ({ progress, settings }) => ({ progress, settings });

export default connect(mapStateToProps)(ProgressBar);
