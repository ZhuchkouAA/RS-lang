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
  };
}
