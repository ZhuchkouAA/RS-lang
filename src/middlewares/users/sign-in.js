<<<<<<< HEAD
import { setAlertMessage, setUserData } from '../../redux/actions/creators/sign-in-data';
=======
import {
  buttonActivitySwitch,
  setAlertMessage,
  setToken,
} from '../../redux/actions/creators/sign-in-data';
>>>>>>> RSL-07: add buttonActivitySwitcher
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

export default function signIn(login, password) {
  return (dispatch) => {
    dispatch(buttonActivitySwitch());
    postRequest(API_URLS.SIGNIN, JSON.stringify({ email: login, password }))
      .then((response) => response.json())
<<<<<<< HEAD
      .then(({ token, userId }) => {
        dispatch(setUserData({ token, userId }));
=======
      .then((response) => {
        dispatch(setToken(response.token));
        dispatch(buttonActivitySwitch());
>>>>>>> RSL-07: add buttonActivitySwitcher
      })
      .catch(() => {
        dispatch(setAlertMessage('invalid data entered'));
        dispatch(buttonActivitySwitch());
      });
  };
}
