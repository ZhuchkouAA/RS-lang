import { applySettings } from '../../redux/actions/creators/settings-data';
import API_URLS from '../../constants/APIUrls';

export function getSettings() {
  const userId = '5eeb6ab698ffbf00174580f0';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWI2YWI2OThmZmJmMDAxNzQ1ODBmMCIsImlhdCI6MTU5MjY1MjA4OCwiZXhwIjoxNTkyNjY2NDg4fQ.vRWn3j_Wfzdw4136cdazcvBi67uLK9NW22CP5qWvTlQ';
  return async (dispatch) => {
    try {
      const rawResponceSetiings = await fetch(API_URLS.USER_SETTINGS(userId), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const responseSettings = await rawResponceSetiings.json();
      console.log(responseSettings);
      const { wordsPerDay, optional } = responseSettings;
      const settings = { wordsPerDay: String(wordsPerDay), ...optional };
      dispatch(applySettings(settings));
    } catch (error) {
      console.log(error);
    }
  };
}

export function putSettings(settings) {
  const userId = '5eeb6ab698ffbf00174580f0';
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZWI2YWI2OThmZmJmMDAxNzQ1ODBmMCIsImlhdCI6MTU5MjY1MjA4OCwiZXhwIjoxNTkyNjY2NDg4fQ.vRWn3j_Wfzdw4136cdazcvBi67uLK9NW22CP5qWvTlQ';
  const { wordsPerDay, ...optional } = settings;
  return async (dispatch) => {
    try {
      const rawResponse = await fetch(API_URLS.USER_SETTINGS(userId), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wordsPerDay,
          optional: { ...optional },
        }),
      });
      const response = await rawResponse.json();
      console.log(response);
      dispatch(applySettings(settings));
    } catch (error) {
      console.log(error);
    }
  };
}
