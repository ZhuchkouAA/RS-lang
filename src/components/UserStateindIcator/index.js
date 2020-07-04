import { connect } from 'react-redux';
import UserStateIndicator from './UserStateIndicator';

const mapStateToProps = ({ progress, settings }) => ({ progress, settings });

export default connect(mapStateToProps)(UserStateIndicator);
