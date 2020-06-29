import { getSettings } from './usersSettings/settings';
import { getProgress, putProgress } from './usersStatistic/statistics';

const serverSynchronization = () => async (dispatch) => {
  await dispatch(getSettings());
  await dispatch(getProgress());
  await dispatch(putProgress());
};

export default serverSynchronization;
