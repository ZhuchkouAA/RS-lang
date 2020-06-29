import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import WordCard2 from '../../components/WordCard';
import { createQueueOrdinary } from '../../helpers/games-utils/card-utils';
import WORD_HANDLER_KEYS from '../../constants/keys';

import wordHandler from '../../helpers/games-utils/wordHandler';

const WordPage = ({
  settings,
  /* progress , */
  serverSynchronization,
  finallySendWordAndProgress,
  onDeleteButton: onDeleteButtonAction,
}) => {
  useEffect(() => {
    serverSynchronization();
  }, []);

  const [workingQueue, setWorkingQueue] = useState(createQueueOrdinary());

  const onDeleteButton = () => {
    // получаем старый объект слова
    const word = workingQueue[workingQueue.length - 1];
    // модифицируем его
    const newWord = wordHandler(word, [WORD_HANDLER_KEYS.isDeleted, true]);
    // отправляем на сервер
    finallySendWordAndProgress(newWord);
    // именяем стейт в приложухе
    onDeleteButtonAction();
    // новую очередь пробрасываем в карточку
    const newQueue = [...workingQueue];
    newQueue.pop();
    setWorkingQueue(newQueue);
    return null;
  };

  return <WordCard2 settings={settings} onDeleteButton={onDeleteButton} queue={workingQueue} />;
};

WordPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  // progress: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  finallySendWordAndProgress: PropTypes.func.isRequired,
  onDeleteButton: PropTypes.func.isRequired,
};

export default WordPage;
