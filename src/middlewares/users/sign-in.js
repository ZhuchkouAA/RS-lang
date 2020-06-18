<<<<<<< HEAD
<<<<<<< HEAD
import { setAlertMessage, setToken } from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

export default function signIn(login, password) {
  return (dispatch) => {
    postRequest(API_URLS.SIGNIN, JSON.stringify({ email: login, password }))
      .then((response) => response.json())
      .then(({ token }) => {
        dispatch(setToken(token));
      })
      .catch(() => {
        dispatch(setAlertMessage('invalid data entered'));
        setTimeout(() => dispatch(setAlertMessage('')), 10000);
      });
=======
import { setToken } from '../../redux/actions/creators/sign-in-data';
=======
import { setAlertMessage, setToken } from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import URL from '../../constants/urls';
>>>>>>> RSL-08: refactor v0.4

export default function signIn(login, password) {
  return (dispatch) => {
    postRequest(URL.signin, JSON.stringify({ email: login, password }))
      .then((response) => response.json())
      .then(({ token }) => {
        dispatch(setToken(token));
      })
<<<<<<< HEAD
      .catch((error) => console.log(error));
>>>>>>> RSL-08: integration with server
=======
      .catch(() => {
        dispatch(setAlertMessage('invalid data entered'));
        setTimeout(() => dispatch(setAlertMessage('')), 10000);
      });
>>>>>>> RSL-08: refactor v0.4
  };
}
