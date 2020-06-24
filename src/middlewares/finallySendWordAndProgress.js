import { postWord, putWord } from './usersWords/userWords';
import { putProgress } from './usersStatistic/statistics';

const finallySendWordAndProgress = (wordObj) => async (dispatch) => {
  if (wordObj.optional.isMethodPost) {
    dispatch((disp) => disp(postWord(wordObj)));
  } else {
    dispatch((disp) => disp(putWord(wordObj)));
  }
  dispatch(putProgress);
};

export default finallySendWordAndProgress;
