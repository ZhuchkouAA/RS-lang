import { showMessage } from '../../redux/actions/creators/modalWindow-data';
import { getCookie } from '../../helpers/cookies-utils';
import putWithTokenRequest from '../../helpers/fetch-utils/putWithToken-response';
import deleteWithTokenRequest from '../../helpers/fetch-utils/deleteWithToken-response';
import getWithTokenRequest from '../../helpers/fetch-utils/getWithToken-response';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

export const updateUser = (email, password) => {
  const url = API_URLS.USERS_BY_USER_ID(getCookie(USER_ID));
  const token = getCookie(TOKEN);
  const body = JSON.stringify({
    email,
    password,
  });

  return () => async (dispatch) => {
    try {
      await putWithTokenRequest(url, token, body);
    } catch (error) {
      dispatch(showMessage(error.message));
    }
  };
};

export const delUser = () => {
  const url = API_URLS.USERS_BY_USER_ID(getCookie(USER_ID));
  const token = getCookie(TOKEN);

  return async (dispatch) => {
    try {
      await deleteWithTokenRequest(url, token);
    } catch (error) {
      dispatch(showMessage(error.message));
    }
  };
};

export const getUser = () => async (dispatch) => {
  const url = API_URLS.USERS_BY_USER_ID(getCookie(USER_ID));
  const token = getCookie(TOKEN);
  try {
    const rawResponse = await getWithTokenRequest(url, token);
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    dispatch(showMessage(error.message));
    return null;
  }
};
