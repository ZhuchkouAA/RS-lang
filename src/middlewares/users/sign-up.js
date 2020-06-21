import {
  buttonActivitySwitch,
  isSignInRender,
  setAlertMessage,
} from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

export default function signUp(login, password) {
  return (dispatch) => {
    dispatch(buttonActivitySwitch());
    postRequest(API_URLS.USERS.createUser, JSON.stringify({ email: login, password }))
      .then((response) => {
        if (!response.ok) {
          dispatch(setAlertMessage(response.statusText));
        }
        return response.json();
      })
      .then(({ error }) => {
        if (!error) {
          dispatch(isSignInRender(true));
          dispatch(setAlertMessage('you have been successfully registered, you can log in'));
        } else {
          const errorPath = error.errors[0].path[0];
          const errorMessage = errorPath === 'password' ? '(password example: grlJHM56_2f)' : '';
          dispatch(setAlertMessage(`${error.errors[0].message} ${errorMessage}`));
        }
        dispatch(buttonActivitySwitch());
      })
      .catch(() => {
        dispatch(setAlertMessage('server error, maybe this login is already taken?'));
        dispatch(buttonActivitySwitch());
      });
  };
}
