import { connect } from 'react-redux';

import SignInPage from './SignInPage';
import signIn from '../../middlewares/users/sign-in';
import signUp from '../../middlewares/users/sign-up';
import { isSignInRender, removeUserData } from '../../redux/actions/creators/sign-in-data';

const mapStateToProps = ({ userData }) => ({
  ...userData,
});

const mapToDispatch = {
  signIn,
  signUp,
  removeUserData,
  isSignInRender,
};

export default connect(mapStateToProps, mapToDispatch)(SignInPage);
