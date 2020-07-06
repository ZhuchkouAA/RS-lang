// вариант с удалением даных на сервере и logoutimport { delUser } from './users/users';
import { delUser } from './users/users';
import { resetProgress } from '../redux/actions/creators/progress-data';
import { resetSettings } from '../redux/actions/creators/settings-data';
import { removeUserData, isSignInRender } from '../redux/actions/creators/sign-in-data';
import { runLoader, stopLoader } from '../redux/actions/creators/loader-creator';

const hardReset = () => async (dispatch) => {
  await dispatch(runLoader());
  await dispatch(resetSettings());
  await dispatch(resetProgress());
  await dispatch(delUser());
  await dispatch(removeUserData());
  await dispatch(isSignInRender(false));
  await dispatch(stopLoader());
};

export default hardReset;
