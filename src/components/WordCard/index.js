import { connect } from 'react-redux';

import WordCard from './WordCard';

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(WordCard);
