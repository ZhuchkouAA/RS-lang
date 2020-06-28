import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import WordCard from '../../components/WordCard';

const WordPage = ({ settings, /* progress , */ serverSynchronization }) => {
  useEffect(() => {
    serverSynchronization();
  }, []);

  // const workingQueue = '';
  console.log(123);

  return <WordCard settings={settings} />;
};

WordPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  // progress: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
};

export default WordPage;
