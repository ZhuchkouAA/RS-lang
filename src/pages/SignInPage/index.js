import { connect } from 'react-redux';

import SignInPage from './SignInPage';
import signIn from '../../middlewares/users/sign-in';
import signUp from '../../middlewares/users/sign-up';
import { isSignInRender, removeToken } from '../../redux/actions/creators/sign-in-data';

const mapStateToProps = ({ userData }) => ({
  ...userData,
});

<<<<<<< HEAD
const mapToDispatch = {
=======
export default connect(mapStateToProps, {
>>>>>>> RSL-08: refactor v0.4
  signIn,
  signUp,
  removeToken,
  isSignInRender,
<<<<<<< HEAD
};

export default connect(mapStateToProps, mapToDispatch)(SignInPage);
=======
})(SignInPage);
>>>>>>> RSL-08: refactor v0.4
