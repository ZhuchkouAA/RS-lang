import { connect } from 'react-redux';

import NavBar from './NavBar';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';

const mapStateToProps = ({ userData }) => ({
  ...userData,
});

const mapToDispatch = {
  setNavBarState,
};

export default connect(mapStateToProps, mapToDispatch)(NavBar);
