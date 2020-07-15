import { connect } from 'react-redux';

import ShortStatisticsDialog from './ShortStatisticsDialog';

const mapStateToProps = ({ progress }) => ({ progress });

export default connect(mapStateToProps)(ShortStatisticsDialog);
