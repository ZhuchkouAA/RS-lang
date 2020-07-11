import { isSignInRender, setAlertMessage } from '../../redux/actions/creators/sign-in-data';
import { runLoader, stopLoader } from '../../redux/actions/creators/loader-creator';

import signIn from './sign-in';
import postRequest from '../../helpers/fetch-utils/post-response';
import API_URLS from '../../constants/APIUrls';

const signUp = (login, password) => {
  return async (dispatch) => {
    try {
      dispatch(runLoader());
      const url = API_URLS.USERS_CREATE_USER;
      const body = JSON.stringify({ email: login, password });

      const rawResponse = await postRequest(url, body);
      if (!rawResponse.ok) dispatch(setAlertMessage(rawResponse.statusText));

      const response = await rawResponse.json();
      const { error } = response;
      if (!error) {
        dispatch(isSignInRender(true));
        // dispatch(setAlertMessage('you have been successfully registered, you can log in'));
        await dispatch(signIn(login, password));
      } else {
        const errorPath = error.errors[0].path[0];
        const errorMessage = errorPath === 'пароль' ? '(пример пароля: grlJHM56_2f)' : '';
        dispatch(setAlertMessage(`${error.errors[0].message} ${errorMessage}`));
      }
      dispatch(stopLoader());
    } catch (error) {
      dispatch(setAlertMessage('ошибка сервера, возможно данный логин уже используется?'));
      dispatch(stopLoader());
    }
  };
};

export default signUp;
