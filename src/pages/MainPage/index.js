import { connect } from 'react-redux';

import MainPage from './MainPage';
import { setGameName } from '../../redux/actions/creators/game-mode';

const mapStateToProps = ({ gameModeData }) => ({
  gameModeData,
});

const actionCreators = {
  setGameName,
};

export default connect(mapStateToProps, actionCreators)(MainPage);
