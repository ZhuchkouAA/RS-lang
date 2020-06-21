import { setAlertMessage, setUserData } from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';
import switchInputs from '../../helpers/signIn-utils';

export default function signIn(login, password, form) {
  return (dispatch) => {
    switchInputs(form, false);
    postRequest(API_URLS.SIGNIN, JSON.stringify({ email: login, password }))
      .then((response) => response.json())
      .then(({ token, userId }) => {
        dispatch(setUserData({ token, userId }));
      })
      .catch(() => {
        switchInputs(form, true);
        dispatch(setAlertMessage('invalid data entered'));
      });
  };
}
