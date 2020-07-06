import { connect } from 'react-redux';

import { createQueueOrdinary } from '../../helpers/games-utils/card-utils';

import WordCard from './WordCard';

const mapStateToProps = () => {
  const queueOrdinary = createQueueOrdinary();

  return { queueOrdinary };
};

export default connect(mapStateToProps)(WordCard);
