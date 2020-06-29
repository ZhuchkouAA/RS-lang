import { postWord, putWord } from './usersWords/userWords';
import { putProgress } from './usersStatistic/statistics';

const finallySendWordAndProgress = (wordObj) => async (dispatch) => {
  if (wordObj.optional.isMethodPost) {
    await dispatch(postWord(wordObj));
  } else {
    await dispatch(putWord(wordObj));
  }
  await dispatch(putProgress());
};

export default finallySendWordAndProgress;
