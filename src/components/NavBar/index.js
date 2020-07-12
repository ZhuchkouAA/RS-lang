import { connect } from 'react-redux';

import NavBar from './NavBar';
import { setNavBarState } from '../../redux/actions/creators/navBar-creator';
import { setGameName } from '../../redux/actions/creators/game-mode';

const mapStateToProps = ({ navBar: { navBarState } }) => ({ navBarState });

const mapToDispatch = (dispatch) => ({
  toggleNav: (state) => dispatch(setNavBarState(state)),
  setGameName: (state) => dispatch(setGameName(state)),
});

export default connect(mapStateToProps, mapToDispatch)(NavBar);
