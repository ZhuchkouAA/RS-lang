import React, { useState } from 'react';
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
// import IconMini from '../IconMini';
import SentenceWithWord from '../SentenceWithWord';
import URLS from '../../constants/APIUrls';
import { getTrackList, playTrackList } from '../../helpers/playsound-utils';
// import { getUserRate } from '../../helpers/text-utils';
import WordColoredChecker from '../WordColoredChecker';

import styles from './WordCard.module.scss';

const cardState = {
  word: 'instruct',
  image: true,
  wordTranslateText: 'инструктирует',
  transcriptionText: '[instrʌ́kt]',
  textMeaningText: 'To <i>instruct</i> is to teach.',
  textMeaningTranslate: 'Обучать - значит учить',
  textExampleText: 'My teacher <b>instructs</b> us in several subjects.',
  textExampleTranslateText: 'Мой учитель учит нас нескольким предметам',
  PICTURE_URL: `${URLS.ASSETS}files/04_0070.jpg`,
  AUDIO: `${URLS.ASSETS}files/02_0621.mp3`,
  AUDIO_MEANING: `${URLS.ASSETS}files/02_0621_meaning.mp3`,
  AUDIO_EXAMPLE: `${URLS.ASSETS}files/02_0621_example.mp3`,
};

const WordCard = ({ settings }) => {
  const {
    isAnswerBtnShow,
    isDelFromLearnBtnShow,
    isFeedBackButtonsShow,
    isImageShow,
    isTextMeaningShow,
    isTextExampleShow,
    isTranscriptionShow,
    isWordTranslateShow,
    // isTextExampleTranslateShow,
    isAudioShow,
    isAudioMeaningShow,
    isAudioExampleShow,
  } = settings;

  const {
    word,
    wordTranslateText,
    transcriptionText,
    textExampleText,
    textExampleTranslateText,
    textMeaningText,
    textMeaningTranslate,
    PICTURE_URL,
    AUDIO,
    AUDIO_MEANING,
    AUDIO_EXAMPLE,
  } = cardState;

  const [controlsState, setControlsState] = useState({
    isVotePanelShow: false,
    isAnswerBtnShow,
    isNextBtnShow: false,
    isInputDisable: false,
    isTranslateShow: false,
  });
  const [isTranslateShow, setTranslateShow] = useState(isWordTranslateShow);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isWordGuessed, setWordGuessed] = useState(false);
  const [isCheckerVisible, setCheckerVisible] = useState(false);
  const [enteredWord, setEnteredWord] = useState('');
  const [wordToCheck, setWordToCheck] = useState('');
  const [cntLearnErrors, setLearnErrors] = useState(0);

  const trackList = getTrackList(settings, cardState);
  const SoundIcon = isMute ? MusicOffIcon : MusicIcon;

  const startPlaying = (tracks) => {
    if (isPlaying || isMute) {
      return;
    }
    setPlaying(true);
    playTrackList(tracks, () => setPlaying(false));
  };

  const handleInputChange = ({ target: { value } }) => {
    setEnteredWord(value);

    if (cntLearnErrors > 0 && value.length > 0) {
      setCheckerVisible(false);
    }
  };

  // const resetStateForNewWord = () => {
  //   setControlsState({
  //     isVotePanelShow: false,
  //     isAnswerBtnShow,
  //     isNextBtnShow: false,
  //     isInputDisable: false,
  //     isTranslateShow: false,
  //   });
  //   setPlaying(false);
  //   setWordGuessed(false);
  //   setCheckerVisible(false);
  //   setCheckerVisible(false);
  //   setCheckerVisible(false);
  //   setEnteredWord('');
  //   setWordToCheck('');
  //   setLearnErrors(0);
  // };

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
      // setVotePanelShow(true);
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

  const handlerSubmit = (e) => {
    e.preventDefault();

    CheckEnteredWord();
  };

  const handlerClickSayWord = () => {
    startPlaying([AUDIO]);
  };

  const handlerClickSayMeaning = () => {
    startPlaying([AUDIO_MEANING]);
  };

  const handlerClickSayExample = () => {
    startPlaying([AUDIO_EXAMPLE]);
  };

  const handlerClickCheckWord = () => {
    CheckEnteredWord();
  };

  const muteSwitchHandler = () => {
    setIsMute(!isMute);
  };

  const translateSwitchHandler = () => {
    setTranslateShow(!isTranslateShow);
  };

  const handlerClickVoteButton = () => {
    // setVotePanelShow(false);
    setControlsState({ ...controlsState, isVotePanelShow: false });
    // const userRate = getUserRate(target);
    // console.log(`handlerClickVoteButton = ${target.innerText} userRate = ${userRate}`);
  };

  // console.log(`controlsState.isVotePanelShow = ${controlsState.isVotePanelShow}`);

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

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item className={styles.WordCard__header}>
          <CardMedia className={imageClasses} image={PICTURE_URL} title="Изучаемое слово" />
        </Grid>
        <Grid item>
          {isWordTranslateShow && (
            <Typography className={translateWordClasses} gutterBottom variant="h6">
              {wordTranslateText}
            </Typography>
          )}
          {isTranscriptionShow && (
            <Typography className={styles.WordCard__word} gutterBottom variant="h6">
              {transcriptionText}
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
                {controlsState.isVotePanelShow && (
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
          sentence={textExampleText}
          translateText={textExampleTranslateText}
          playText={handlerClickSayExample}
          isWordVisible={isWordGuessed}
          isSentenceShow={isTextExampleShow}
          isTranslateShow={isTranslateExampleShow}
          isAudioBtnShow={isAudioExampleShow}
        />
        <SentenceWithWord
          word={word}
          sentence={textMeaningText}
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
              <Button variant="contained" color="secondary">
                Показать ответ
              </Button>
            </Grid>
          )}
          {controlsState.isNextBtnShow && (
            <Grid item>
              <Button variant="contained" color="primary">
                Следующее слово
              </Button>
            </Grid>
          )}
        </Grid>
        {isDelFromLearnBtnShow && (
          <Box position="absolute">
            <Tooltip title="Удалить слово из изучения">
              <IconButton aria-label="delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box position="absolute" right="16px">
          <Tooltip title="Выключить звук">
            <IconButton onClick={muteSwitchHandler} aria-label="mute">
              <SoundIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box position="absolute" right="52px">
          <Tooltip title="Не показывать перевод">
            <IconButton
              onClick={translateSwitchHandler}
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
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default WordCard;
