import { connect } from 'react-redux';
import Header from './Header';
import { removeToken } from '../../redux/actions/creators/sign-in-data';

const mapStateToProps = ({ userData: { token } }) => ({
  token,
});

const mapToDispatch = {
  removeToken,
};

export default connect(mapStateToProps, mapToDispatch)(Header);
