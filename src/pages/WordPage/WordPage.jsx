import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import WordCard from '../../components/WordCard';

import wordHandler from '../../helpers/games-utils/wordHandler';

const WordPage = ({
  settings,
  serverSynchronization,
  finallySendWordAndProgress,
  updateProgressAfterWordProcessed,
  isLoading,
}) => {
  useEffect(() => {
    serverSynchronization();
  }, []);

  const updateWordServerState = (word, option) => {
    const updatedWord = wordHandler(word, option);

    updateProgressAfterWordProcessed();

    finallySendWordAndProgress(updatedWord);
  };

  if (isLoading) {
    return <div />;
  }

  return <WordCard settings={settings} updateWordServerState={updateWordServerState} />;
};

WordPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
  updateProgressAfterWordProcessed: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default WordPage;
