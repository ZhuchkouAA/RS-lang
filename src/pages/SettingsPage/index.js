import { connect } from 'react-redux';

import { putSettings } from '../../middlewares/usersSettings/settings';
import { putProgress } from '../../middlewares/usersStatistic/statistics';
import hardReset from '../../middlewares/hardReset';
import serverSynchronization from '../../middlewares/serverSynchronization';
import {
  setLeftNewWordsToday,
  setLeftRepeatWordsToday,
} from '../../redux/actions/creators/progress-data';

import SettingsPage from './SettingsPage';

const mapStateToProps = ({ settings, progress, loader: { isLoading } }) => ({
  settings,
  progress,
  isLoading,
});

const actionCreators = {
  putProgress,
  putSettings,
  hardReset,
  serverSynchronization,
  setLeftNewWordsToday,
  setLeftRepeatWordsToday,
};

export default connect(mapStateToProps, actionCreators)(SettingsPage);
