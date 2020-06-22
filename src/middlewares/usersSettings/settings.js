import { applySettings } from '../../redux/actions/creators/settings-data';
import { showMessage } from '../../redux/actions/creators/modalWindow-data';
import postWithTokenRequest from '../../helpers/fetch-utils/postWithToken-response';
import getRequest from '../../helpers/fetch-utils/getWithToken-response';
import { getCookie } from '../../helpers/cookies-utils';

import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';

export const getSettings = () => {
  const url = API_URLS.USER_SETTINGS(getCookie(USER_ID));

  return async (dispatch) => {
    try {
      const rawResponceSetiings = await getRequest(url, getCookie(TOKEN));
      const responseSettings = await rawResponceSetiings.json();
      const { wordsPerDay, optional } = responseSettings;
      const settings = { wordsPerDay: String(wordsPerDay), ...optional };
      dispatch(applySettings(settings));
    } catch (error) {
      dispatch(showMessage(error.message));
    }
  };
};

export const putSettings = (settings) => {
  const { wordsPerDay, ...optional } = settings;
  const body = JSON.stringify({ wordsPerDay, optional: { ...optional } });
  const url = API_URLS.USER_SETTINGS(getCookie(USER_ID));

  return async (dispatch) => {
    try {
      const rawResponse = await postWithTokenRequest(url, getCookie(TOKEN), body);
      if (!rawResponse.ok) {
        throw new Error('bad responce');
      } else {
        dispatch(applySettings(settings));
      }
    } catch (error) {
      dispatch(showMessage(error.message));
    }
  };
};
