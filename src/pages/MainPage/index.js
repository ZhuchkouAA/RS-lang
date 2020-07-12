import { connect } from 'react-redux';

import MainPage from './MainPage';
import serverSynchronization from '../../middlewares/serverSynchronization';
import { setGameName } from '../../redux/actions/creators/game-mode';

const mapStateToProps = ({ gameModeData }) => ({
  gameModeData,
});

const actionCreators = {
  setGameName,
  serverSynchronization,
};

export default connect(mapStateToProps, actionCreators)(MainPage);
