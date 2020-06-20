import { connect } from 'react-redux';

import Header from './Header';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';

const mapStateToProps = ({ userData }) => ({
  ...userData,
});

const mapToDispatch = {
  setNavBarState,
};

export default connect(mapStateToProps, mapToDispatch)(Header);
