import { connect } from 'react-redux';
import Header from './Header';
import { removeUserData } from '../../redux/actions/creators/sign-in-data';

const mapStateToProps = ({ userData: { token } }) => ({
  token,
});

const mapToDispatch = {
  removeUserData,
};

export default connect(mapStateToProps, mapToDispatch)(Header);
