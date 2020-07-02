import { connect } from 'react-redux';

import ShortStatisticsDialog from './ShortStatisticsDialog';

const mapStateToProps = ({ progress, settings }) => ({ progress, settings });

export default connect(mapStateToProps)(ShortStatisticsDialog);
