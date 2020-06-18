import { isSignInRender, setAlertMessage } from '../../redux/actions/creators/sign-in-data';
<<<<<<< HEAD
<<<<<<< HEAD
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

export default function signUp(login, password) {
  return (dispatch) => {
    postRequest(API_URLS.USERS.createUser, JSON.stringify({ email: login, password }))
      .then((response) => {
        if (!response.ok) {
          dispatch(setAlertMessage(response.statusText));
        }
        return response.json();
      })
      .then((response) => {
        if (!response.error) {
          dispatch(isSignInRender(true));
          dispatch(setAlertMessage('you have been successfully registered, you can log in'));
          setTimeout(() => dispatch(setAlertMessage('')), 10000);
        } else {
          dispatch(setAlertMessage(response.error.errors[0].message));
          setTimeout(() => dispatch(setAlertMessage('')), 10000);
        }
      })
      .catch(() => {
        dispatch(setAlertMessage('server error, maybe this login is already taken?'));
        setTimeout(() => dispatch(setAlertMessage('')), 10000);
=======
=======
import postRequest from '../../helpers/fetch-utils/post-response';
import URL from '../../constants/urls';
>>>>>>> RSL-08: refactor v0.4

export default function signUp(login, password) {
  return (dispatch) => {
    postRequest(URL.users, JSON.stringify({ email: login, password }))
      .then((response) => {
        if (!response.ok) {
          dispatch(setAlertMessage(response.statusText));
          return response.json();
        }
        return response.json();
      })
      .then((response) => {
        if (!response.error) {
          dispatch(isSignInRender(true));
          dispatch(setAlertMessage('you have been successfully registered, you can log in'));
          setTimeout(() => dispatch(setAlertMessage('')), 10000);
        } else {
          dispatch(setAlertMessage(response.error.errors[0].message));
          setTimeout(() => dispatch(setAlertMessage('')), 10000);
        }
      })
      .catch(() => {
        dispatch(setAlertMessage('server error, maybe this login is already taken?'));
<<<<<<< HEAD
        setTimeout(() => dispatch(setAlertMessage('')), 5000);
>>>>>>> RSL-08: integration with server
=======
        setTimeout(() => dispatch(setAlertMessage('')), 10000);
>>>>>>> RSL-08: refactor v0.4
      });
  };
}
