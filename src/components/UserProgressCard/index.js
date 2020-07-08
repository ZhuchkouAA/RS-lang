import { connect } from 'react-redux';

import UserProgressCard from './UserProgressCard';

const mapStateToProps = ({ progress, settings }) => ({ progress, settings });

export default connect(mapStateToProps)(UserProgressCard);
