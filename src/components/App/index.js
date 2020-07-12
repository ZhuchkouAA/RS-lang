import { connect } from 'react-redux';

import App from './App';
import { TOKEN } from '../../constants/cookiesNames';

const mapStateToProps = ({ userData: { getUserData, userData }, loader: { isLoading } }) => ({
  token: getUserData(TOKEN),
  userData,
  isLoading,
});

export default connect(mapStateToProps)(App);
