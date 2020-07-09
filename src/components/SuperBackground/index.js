import { connect } from 'react-redux';

import SuperBackground from './SuperBackground';

const mapStateToProps = ({ navBar: { opacity } }) => ({ opacity });

export default connect(mapStateToProps)(SuperBackground);
