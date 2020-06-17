import { isSignInRender, setAlertMessage } from '../../redux/actions/creators/sign-in-data';

export default function signUp(login, password) {
  return (dispatch) => {
    fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login, password }),
    })
      .then((response) => response.ok)
      .then((isOk) => {
        if (isOk) {
          dispatch(isSignInRender(true));
          dispatch(setAlertMessage('you have been successfully registered, you can log in'));
        } else {
          dispatch(setAlertMessage('password example: "45Gfhjkm_123"'));
        }
        setTimeout(() => dispatch(setAlertMessage('')), 5000);
      })
      .catch(() => {
        dispatch(setAlertMessage('server error, maybe this login is already taken?'));
        setTimeout(() => dispatch(setAlertMessage('')), 5000);
      });
  };
}
