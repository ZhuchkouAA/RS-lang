import { connect } from 'react-redux';

import Header from './Header';
import { removeToken } from '../../redux/actions/creators/sign-in-data';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';

const mapStateToProps = ({ userData: { token } }) => ({ token });

const mapToDispatch = {
  setNavBarState,
  removeToken,
};

export default connect(mapStateToProps, mapToDispatch)(Header);
