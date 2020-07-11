import { connect } from 'react-redux';

import GameStartScreen from './GamaStartScreen';
import { setGameMode, setGameWords, setRandomWords } from '../../redux/actions/creators/game-mode';
import { runLoader, stopLoader } from '../../redux/actions/creators/loader-creator';
import serverSynchronization from '../../middlewares/serverSynchronization';

const mapStateToProps = ({ gameModeData, progress, loader }) => ({
  gameModeData,
  repeatWords: progress.queueRepeatWords,
  isLoading: loader.isLoading,
});

const actionCreators = {
  setGameMode,
  setGameWords,
  setRandomWords,
  runLoader,
  stopLoader,
  serverSynchronization,
};

export default connect(mapStateToProps, actionCreators)(GameStartScreen);
