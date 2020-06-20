import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = ({ userData: { token } }) => ({
  token,
});

export default connect(mapStateToProps)(App);
