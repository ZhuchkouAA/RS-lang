import { connect } from 'react-redux';

import LogoutButton from './LogoutButton';

const mapStateToProps = () => {
  return {};
};

const LogoutButtonContainer = connect(mapStateToProps)(LogoutButton);

export default LogoutButtonContainer;
