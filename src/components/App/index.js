import { connect } from 'react-redux';

import App from './App';
import { TOKEN } from '../../constants/cookiesNames';

const mapStateToProps = ({ userData: { getUserData, userData } }) => ({
  token: getUserData(TOKEN),
  userData,
});

export default connect(mapStateToProps)(App);
