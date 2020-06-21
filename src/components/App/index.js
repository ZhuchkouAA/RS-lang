import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = ({ userData: { getUserData, userData } }) => ({
  getUserData,
  userData,
});

export default connect(mapStateToProps)(App);
