import { connect } from 'react-redux';
import OnwGamePage from './OnwGamePage';

const mapStateToProps = ({ gameModeData: { words } }) => ({
  words,
});

export default connect(mapStateToProps)(OnwGamePage);
