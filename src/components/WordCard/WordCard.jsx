import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Grid,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Fab,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MusicIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import TranslateIcon from '@material-ui/icons/Translate';

import VoteButtonsPanel from '../VoteButtonsPanel';
import WordInput from '../WordInput';
import SentenceWithWord from '../SentenceWithWord';
import URLS from '../../constants/APIUrls';
import { getTrackList, playTrackList } from '../../helpers/playsound-utils';
// import { getUserRate } from '../../helpers/text-utils';
import WordColoredChecker from '../WordColoredChecker';

import styles from './WordCard.module.scss';

const WordCard = ({ settings, queueOrdinary }) => {
  const {
    isAnswerBtnShow,
    isDelFromLearnBtnShow,
    isFeedBackButtonsShow,
    isImageShow,
    isTextMeaningShow,
    isTextExampleShow,
    isTranscriptionShow,
    isWordTranslateShow,
    isAudioShow,
    isAudioMeaningShow,
    isAudioExampleShow,
  } = settings;

  const [controlsState, setControlsState] = useState({
    isVotePanelShow: false,
    isAnswerBtnShow,
    isNextBtnShow: false,
    isInputDisable: false,
    isTranslateShow: false,
  });
  const [wordsQueue, setWordsQueue] = useState(queueOrdinary);
  const [isTranslateShow, setTranslateShow] = useState(isWordTranslateShow);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isWordGuessed, setWordGuessed] = useState(false);
  const [isCheckerVisible, setCheckerVisible] = useState(false);
  const [enteredWord, setEnteredWord] = useState('');
  const [wordToCheck, setWordToCheck] = useState('');
  const [cntLearnErrors, setLearnErrors] = useState(0);
  const [isAnswerShowed, setAnswerShowed] = useState(false);

  const trackList = getTrackList(settings, wordsQueue[0]);
  const SoundIcon = isMute ? MusicOffIcon : MusicIcon;

  const {
    word,
    wordTranslate,
    transcription,
    textExample,
    textExampleTranslate,
    textMeaning,
    textMeaningTranslate,
    image,
    audio,
    audioMeaning,
    audioExample,
  } = wordsQueue[0].optional;

  const imageUrl = `${URLS.ASSETS}${image}`;
  const audioUrl = `${URLS.ASSETS}${audio}`;
  const audioMeaningUrl = `${URLS.ASSETS}${audioMeaning}`;
  const audioExampleUrl = `${URLS.ASSETS}${audioExample}`;

  const getNextWord = () => {
    const newWordsQueue = wordsQueue.slice(1);

    if (newWordsQueue.length > 0) {
      setWordsQueue(newWordsQueue);
    } else {
      // todo вызывать сообщение о завершении слов
    }
  };

  const resetStateForNewWord = () => {
    setControlsState({
      isVotePanelShow: false,
      isAnswerBtnShow,
      isNextBtnShow: false,
      isInputDisable: false,
      isTranslateShow: false,
    });
    setPlaying(false);
    setWordGuessed(false);
    setCheckerVisible(false);
    setEnteredWord('');
    setWordToCheck('');
    setLearnErrors(0);
    setAnswerShowed(false);
  };

  const goToNextWord = () => {
    resetStateForNewWord();
    getNextWord();
  };

  const startPlaying = (tracks) => {
    if (isPlaying || isMute) {
      return;
    }

    setPlaying(true);
    playTrackList(tracks, () => {
      setPlaying(false);
      goToNextWord();
    });
  };

  const CheckEnteredWord = () => {
    if (enteredWord.length === 0) {
      return;
    }

    setWordToCheck(enteredWord);
    setCheckerVisible(true);
    setEnteredWord('');

    if (enteredWord === word) {
      setWordGuessed(true);
      startPlaying(trackList);
      setControlsState({
        ...controlsState,
        isVotePanelShow: true,
        isAnswerBtnShow: false,
        isNextBtnShow: true,
        isInputDisable: true,
        isTranslateShow: true,
      });
    } else {
      setLearnErrors(cntLearnErrors + 1);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setEnteredWord(value);

    if (cntLearnErrors > 0 && value.length > 0) {
      setCheckerVisible(false);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    CheckEnteredWord();
  };

  const handlerClickSayMeaning = () => {
    startPlaying([audioMeaningUrl]);
  };

  const handlerClickSayExample = () => {
    startPlaying([audioExampleUrl]);
  };

  const handlerClickSayWord = () => {
    startPlaying([audioUrl]);
  };

  const handlerClickCheckWord = () => {
    CheckEnteredWord();
  };

  const handlerClickShowAnswer = () => {
    setAnswerShowed(true);
    setEnteredWord(word);
    // todo давать мксимальный штраф за показать ответ
    // goToNextWord();
    setControlsState({
      ...controlsState,
      isAnswerBtnShow: false,
      isNextBtnShow: true,
    });
  };

  const handlerClickNextWord = () => {
    goToNextWord();
  };

  const handlerClickMuteSwitch = () => {
    setIsMute(!isMute);
  };

  const handlerClickTranslateSwitch = () => {
    setTranslateShow(!isTranslateShow);
  };

  const handlerClickVoteButton = () => {
    setControlsState({ ...controlsState, isVotePanelShow: false });

    // const userRate = getUserRate(target);
  };

  const handlerClickDeleteWord = () => {
    goToNextWord();
  };

  useEffect(() => {
    if (isAnswerShowed) {
      CheckEnteredWord();
    }
  });

  const isTranslateNeed = controlsState.isTranslateShow && isTranslateShow;
  const translateIcoColor = isTranslateShow ? 'secondary' : 'default';

  const translateWordClasses = classNames(styles.WordCard__word, {
    [styles['Block--hide']]: !(isTranslateNeed || isWordTranslateShow),
  });

  const isTranslateExampleShow = isTranslateNeed && isTextExampleShow;
  const isTranslateMeaningShow = isTranslateNeed && isTextMeaningShow;

  const imageClasses = classNames(styles.WordCard__image, {
    [styles['Block--hide']]: !isImageShow,
  });

  const isVoteButtonsPanelShow =
    controlsState.isVotePanelShow && !isAnswerShowed && isFeedBackButtonsShow;

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item className={styles.WordCard__header}>
          <CardMedia className={imageClasses} image={imageUrl} title="Изучаемое слово" />
        </Grid>
        <Grid item>
          {isWordTranslateShow && (
            <Typography className={translateWordClasses} gutterBottom variant="h6">
              {wordTranslate}
            </Typography>
          )}
          {isTranscriptionShow && (
            <Typography className={styles.WordCard__word} gutterBottom variant="h6">
              {transcription}
            </Typography>
          )}
        </Grid>
      </Grid>
      <CardContent className={styles.WordCard__content}>
        <Box mb={2}>
          <form onSubmit={handlerSubmit}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                {isFeedBackButtonsShow && (
                  <Tooltip title="Добавить слово в 'Сложные'" aria-label="add">
                    <Fab color="primary" size="small">
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                )}
              </Grid>
              <Grid item className={styles.WordCard__input}>
                <WordInput
                  word={word}
                  handleInputChange={handleInputChange}
                  enteredWord={enteredWord}
                  isInputDisable={controlsState.isInputDisable}
                />
                <WordColoredChecker
                  isVisible={isCheckerVisible}
                  word={word}
                  wordToCheck={wordToCheck}
                />
                {isVoteButtonsPanelShow && (
                  <VoteButtonsPanel handlerClick={handlerClickVoteButton} />
                )}
              </Grid>
              <Grid item>
                <Tooltip title="Проверить слово" aria-label="add">
                  <Fab onClick={handlerClickCheckWord} type="submit" color="primary" size="small">
                    <CheckIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              {isAudioShow && (
                <Grid item>
                  <Tooltip title="Произнести слово" aria-label="add">
                    <span>
                      <Fab onClick={handlerClickSayWord} type="button" color="primary" size="small">
                        <PlayCircleOutlineRoundedIcon />
                      </Fab>
                    </span>
                  </Tooltip>
                </Grid>
              )}
            </Grid>
          </form>
        </Box>
        <SentenceWithWord
          word={word}
          sentence={textExample}
          translateText={textExampleTranslate}
          playText={handlerClickSayExample}
          isWordVisible={isWordGuessed}
          isSentenceShow={isTextExampleShow}
          isTranslateShow={isTranslateExampleShow}
          isAudioBtnShow={isAudioExampleShow}
        />
        <SentenceWithWord
          word={word}
          sentence={textMeaning}
          translateText={textMeaningTranslate}
          playText={handlerClickSayMeaning}
          isWordVisible={isWordGuessed}
          isSentenceShow={isTextMeaningShow}
          isTranslateShow={isTranslateMeaningShow}
          isAudioBtnShow={isAudioMeaningShow}
        />
      </CardContent>
      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          {controlsState.isAnswerBtnShow && (
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handlerClickShowAnswer}>
                Показать ответ
              </Button>
            </Grid>
          )}
          {controlsState.isNextBtnShow && (
            <Grid item>
              <Button variant="contained" color="primary" onClick={handlerClickNextWord}>
                Следующее слово
              </Button>
            </Grid>
          )}
        </Grid>
        {isDelFromLearnBtnShow && (
          <Box position="absolute">
            <Tooltip title="Удалить слово из изучения">
              <IconButton aria-label="delete" onClick={handlerClickDeleteWord}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box position="absolute" right="16px">
          <Tooltip title="Выключить звук">
            <IconButton onClick={handlerClickMuteSwitch} aria-label="mute">
              <SoundIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box position="absolute" right="52px">
          <Tooltip title="Не показывать перевод">
            <IconButton
              onClick={handlerClickTranslateSwitch}
              color={translateIcoColor}
              aria-label="translate"
            >
              <TranslateIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

WordCard.propTypes = {
<<<<<<< HEAD
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
=======
  settings: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
  queueOrdinary: PropTypes.arrayOf(PropTypes.object).isRequired,
>>>>>>> RSL-13: add words from queue
};
export default WordCard;
