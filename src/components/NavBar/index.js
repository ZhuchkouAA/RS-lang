import { connect } from 'react-redux';

import NavBar from './NavBar';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';
import store from '../../redux/redux-store';

const mapStateToProps = ({ navBar: { navBarState } }) => ({ navBarState });

const mapToDispatch = {
  toggleNav: (state) => store.dispatch(setNavBarState(state)),
};

export default connect(mapStateToProps, mapToDispatch)(NavBar);
