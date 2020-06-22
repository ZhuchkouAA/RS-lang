import {
  setAlertMessage,
  setUserData,
  buttonActivitySwitch,
} from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

export default function signIn(login, password) {
  return (dispatch) => {
    dispatch(buttonActivitySwitch());
    postRequest(API_URLS.SIGN_IN, JSON.stringify({ email: login, password }))
      .then((response) => response.json())
      .then(({ token, userId }) => {
        dispatch(setUserData({ token, userId }));
        dispatch(buttonActivitySwitch());
      })
      .catch(() => {
        dispatch(setAlertMessage('invalid data entered'));
        dispatch(buttonActivitySwitch());
      });
  };
}
