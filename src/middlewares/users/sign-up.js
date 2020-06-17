import { isSignInRender, setAlertMessage } from '../../redux/actions/creators/sign-in-data';
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
>>>>>>> RSL-08: integration with server
      });
  };
}
