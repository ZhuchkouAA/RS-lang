import { isSignInRender, setAlertMessage } from '../../redux/actions/creators/sign-in-data';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';
import switchInputs from '../../helpers/signIn-utils';

export default function signUp(login, password, form) {
  return (dispatch) => {
    switchInputs(form, false);
    postRequest(API_URLS.USERS.createUser, JSON.stringify({ email: login, password }))
      .then((response) => {
        if (!response.ok) {
          dispatch(setAlertMessage(response.statusText));
          switchInputs(form, true);
        }
        return response.json();
      })
      .then((response) => {
        if (!response.error) {
          dispatch(isSignInRender(true));
          dispatch(setAlertMessage('you have been successfully registered, you can log in'));
        } else {
          dispatch(setAlertMessage(response.error.errors[0].message));
        }
        switchInputs(form, true);
      })
      .catch(() => {
        switchInputs(form, true);
        dispatch(setAlertMessage('server error, maybe this login is already taken?'));
      });
  };
}
