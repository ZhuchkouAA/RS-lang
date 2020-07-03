import { connect } from 'react-redux';

import GameStartScreen from './GamaStartScreen';
import { setGameMode, setGameWords, setRandomWords } from '../../redux/actions/creators/game-mode';
import { runLoader, stopLoader } from '../../redux/actions/creators/loader-creator';

const mapStateToProps = ({ gameModeData, progress }) => ({
  gameModeData,
  repeatWords: progress.queueRepeatWords,
});

const actionCreators = {
  setGameMode,
  setGameWords,
  setRandomWords,
  runLoader,
  stopLoader,
};

export default connect(mapStateToProps, actionCreators)(GameStartScreen);
