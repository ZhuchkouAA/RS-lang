import { connect } from 'react-redux';

import AppWithRouter from './AppWithRouter';

const mapStateToProps = ({ gameModeData: { gameName, words } }) => ({
  gameName,
  words,
});

export default connect(mapStateToProps)(AppWithRouter);
