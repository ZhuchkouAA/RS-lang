import { getSettings } from './usersSettings/settings';
import { getProgress, putProgress } from './usersStatistic/statistics';
import { runLoader, stopLoader } from '../redux/actions/creators/loader-creator';

const serverSynchronization = () => async (dispatch) => {
  await dispatch(runLoader());
  await dispatch(getSettings());
  await dispatch(getProgress());
  await dispatch(putProgress());
  await dispatch(stopLoader());
};

export default serverSynchronization;
