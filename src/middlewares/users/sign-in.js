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

export default function signIn(login, password) {
  return (dispatch) => {
    fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login, password }),
    })
      .then((response) => response.json())
      .then((content) => {
        dispatch(setToken(content.token));
      })
      .catch((error) => console.log(error));
>>>>>>> RSL-08: integration with server
  };
}
