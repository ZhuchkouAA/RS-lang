import { connect } from 'react-redux';

import DictionaryTable from './DictionaryTable';

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(DictionaryTable);
