import { connect } from 'react-redux';

import { createQueueOrdinary } from '../../helpers/games-utils/card-utils';

import WordCard from './WordCard';

const cardState = {
  optional: {
    word: 'acre',
    wordTranslate: 'акр',
    transcription: '[éikər]',
    textMeaning: 'An <i>acre</i> is a unit for measuring area.',
    textMeaningTranslate: 'Акр - это единица измерения площади',
    textExample: 'They lived on a 150-<b>acre</b> farm.',
    textExampleTranslate: 'Они жили на 150-акровой ферме',
    image: 'files/01_1201.jpg',
    audio: 'files/01_1201.mp3',
    audioMeaning: 'files/01_1201_meaning.mp3',
    audioExample: 'files/01_1201_example.mp3',
  },
};

const mapStateToProps = () => {
  let queueOrdinary = createQueueOrdinary();

  queueOrdinary = queueOrdinary.length > 0 ? queueOrdinary : [cardState];

  return { queueOrdinary };
};

export default connect(mapStateToProps)(WordCard);
