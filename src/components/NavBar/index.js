import NavBar from './NavBar';
import store from '../../redux/redux-store';

store.subscribe(() => NavBar);

export default NavBar;
