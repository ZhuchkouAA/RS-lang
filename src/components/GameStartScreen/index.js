import { connect } from 'react-redux';

import GameStartScreen from './GamaStartScreen';
import { setGameMode, setGameWords } from '../../redux/actions/creators/game-mode';

const mapStateToProps = ({ gameModeData, progress }) => ({
  gameModeData,
  repeatWords: progress.queueRepeatWords,
});

const actionCreators = {
  setGameMode,
  setGameWords,
};

export default connect(mapStateToProps, actionCreators)(GameStartScreen);
