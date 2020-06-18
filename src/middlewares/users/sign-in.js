import { setAlertMessage, setToken } from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import URL from '../../constants/urls';

export default function signIn(login, password) {
  return (dispatch) => {
    postRequest(URL.signin, JSON.stringify({ email: login, password }))
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
