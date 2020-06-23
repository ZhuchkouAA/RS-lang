import { connect } from 'react-redux';

import NavBar from './NavBar';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';

const mapStateToProps = ({ navBar: { navBarState } }) => ({ navBarState });

const mapToDispatch = (dispatch) => ({
  toggleNav: (state) => dispatch(setNavBarState(state)),
});

export default connect(mapStateToProps, mapToDispatch)(NavBar);
