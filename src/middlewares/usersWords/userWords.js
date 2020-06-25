import API_URLS from '../../constants/APIUrls';
import { USER_ID, TOKEN } from '../../constants/cookiesNames';
import { getCookie } from '../../helpers/cookies-utils';
import postWithTokenRequest from '../../helpers/fetch-utils/postWithToken-response';
import putWithTokenRequest from '../../helpers/fetch-utils/putWithToken-response';
import { showMessage } from '../../redux/actions/creators/modalWindow-data';

export const postWord = (wordObj) => async (dispatch) => {
  const { wordId, difficulty, optional } = wordObj;
  const url = API_URLS.USER_WORDS_BY_USER_ID_WORD_ID(getCookie(USER_ID), wordId);
  const token = getCookie(TOKEN);
  const newWordObj = { difficulty, optional };
  newWordObj.optional.isMethodPost = false;
  const body = JSON.stringify(newWordObj);
  try {
    const rawResponse = await postWithTokenRequest(url, token, body);
    if (!rawResponse.ok) throw new Error('bad responce');
    dispatch(showMessage('Удалось отправить данные -- сервер доступен'));
  } catch (error) {
    dispatch(showMessage('Не удалось отправить данные -- сервер недоступен'));
  }
};

export const putWord = (wordObj) => async (dispatch) => {
  const { wordId, difficulty, optional } = wordObj;
  const url = API_URLS.USER_WORDS_BY_USER_ID_WORD_ID(getCookie(USER_ID), wordId);
  const token = getCookie(TOKEN);
  const newWordObj = { difficulty, optional };
  const body = JSON.stringify(newWordObj);
  try {
    const rawResponse = await putWithTokenRequest(url, token, body);
    if (!rawResponse.ok) throw new Error('bad responce');
    dispatch(showMessage('Удалось отправить данные -- сервер доступен'));
  } catch (error) {
    dispatch(showMessage('Не удалось отправить данные -- сервер недоступен'));
  }
};
