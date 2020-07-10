import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
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
import RefreshIcon from '@material-ui/icons/Refresh';

import WordColoredChecker from '../WordColoredChecker';
import VoteButtonsPanel from '../VoteButtonsPanel';
import WordInput from '../WordInput';
import SentenceWithWord from '../SentenceWithWord';
import Dialog from '../Dialog';
import ShortStatisticsDialog from '../ShortStatisticsDialog';

import PATH from '../../constants/path';
import URLS from '../../constants/APIUrls';
import WORD_HANDLER_KEYS from '../../constants/keys';
import { DIFFICULTY_REPEAT_VALUE } from '../../constants/variables-learning';
import { WORDS_END, HARD_WORDS_END } from '../../constants/modal-messages';
import wordHandler from '../../helpers/games-utils/wordHandler';
import { getTrackList, playTrackList } from '../../helpers/playsound-utils';
import { getUserRate } from '../../helpers/text-utils';
import { getNewWordDifficulty } from '../../helpers/repeat-logic-utils';

import styles from './WordCard.module.scss';

const WordCard = ({
  settings,
  onDeleteButton,
  onHardButton,
  onCheckEnteredWord,
  onVoteButton,
  queue,
  isDemoQueue,
  resetPrevPage,
}) => {
  const {
    isAnswerBtnShow,
    isDelFromLearnBtnShow,
    isFeedBackButtonsShow,
    isHardWordBtnShow,
    isImageShow,
    isTextMeaningShow,
    isTextExampleShow,
    isTranscriptionShow,
    isWordTranslateShow,
    isAudioShow,
    isAudioMeaningShow,
    isAudioExampleShow,
  } = settings;

  const history = useHistory();

  const [controlsState, setControlsState] = useState({
    isVotePanelShow: false,
    isAnswerBtnShow,
    isNextBtnShow: false,
    isInputDisable: false,
    isTranslateShow: false,
  });
  const [wordsQueue, setWordsQueue] = useState(queue);
  const [isTranslateShow, setTranslateShow] = useState(isWordTranslateShow);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [isWordGuessed, setWordGuessed] = useState(false);
  const [checkerState, setCheckerState] = useState({ isShow: false, isWorking: false });
  const [enteredWord, setEnteredWord] = useState('');
  const [wordToCheck, setWordToCheck] = useState('');
  const [cntLearnErrors, setLearnErrors] = useState(0);
  const [isAnswerShowed, setAnswerShowed] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const SoundIcon = isMute ? MusicOffIcon : MusicIcon;

  const nextBtn = useRef(null);

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

  const pickNextWordFromQueue = () => {
    const newWordsQueue = wordsQueue.slice(1);

    if (newWordsQueue.length > 0) {
      setWordsQueue(newWordsQueue);
    } else {
      setModalOpen(true);
      setControlsState({
        ...controlsState,
        isVotePanelShow: false,
        isAnswerBtnShow: false,
        isNextBtnShow: false,
      });
    }
  };

  const resetStateForNewWord = () => {
    setCheckerState({ isShow: false, isWorking: false });
    setControlsState({
      isVotePanelShow: false,
      isAnswerBtnShow,
      isNextBtnShow: false,
      isInputDisable: false,
      isTranslateShow: false,
    });
    setPlaying(false);
    setWordGuessed(false);
    setEnteredWord('');
    setWordToCheck('');
    setLearnErrors(0);
    setAnswerShowed(false);
  };

  const goToNextWord = () => {
    resetStateForNewWord();
    pickNextWordFromQueue();
  };

  const startPlaying = (tracks) => {
    if (isPlaying) {
      return;
    }

    setPlaying(true);
    const newPlayer = playTrackList(tracks, () => {
      setPlaying(false);

      if (isWordGuessed) {
        goToNextWord();
      }
    });

    setPlayer(newPlayer);
  };

  const redirectToMainPage = () => {
    resetPrevPage();
    history.push(PATH.MAIN);
  };

  const CheckEnteredWord = () => {
    if (enteredWord.length === 0) {
      return;
    }

    setWordToCheck(enteredWord);
    setCheckerState({ isShow: true, isWorking: true });
    setEnteredWord('');

    if (enteredWord.toLowerCase() === word.toLowerCase()) {
      if (!isMute) {
        const trackList = getTrackList(settings, wordsQueue[0].optional);
        startPlaying(trackList);
      }

      setWordGuessed(true);
      setControlsState({
        ...controlsState,
        isVotePanelShow: true,
        isAnswerBtnShow: false,
        isNextBtnShow: true,
        isInputDisable: true,
        isTranslateShow: true,
      });

      const { difficulty } = wordsQueue[0];
      const penaltyForShowingAnswer = isAnswerShowed ? DIFFICULTY_REPEAT_VALUE : 0;
      const newWordDifficulty = getNewWordDifficulty(
        difficulty,
        penaltyForShowingAnswer,
        cntLearnErrors
      );

      if (cntLearnErrors > 0) {
        setWordsQueue([...wordsQueue, wordsQueue[0]]);
      }

      const isFailsExist = cntLearnErrors !== 0;

      onCheckEnteredWord(wordsQueue[0], isFailsExist, newWordDifficulty);
    } else {
      setLearnErrors(cntLearnErrors + 1);
    }
  };

  const handleInputChange = ({ target: { value } }) => {
    setEnteredWord(value);

    if (cntLearnErrors > 0 && value.length > 0) {
      setCheckerState({ ...checkerState, isWorking: false });
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
    setControlsState({
      ...controlsState,
      isAnswerBtnShow: false,
      isNextBtnShow: true,
    });
  };

  const handlerClickNextWord = () => {
    goToNextWord();

    if (player) {
      player.stop();
    }
  };

  const handlerClickMuteSwitch = () => {
    setIsMute(!isMute);
  };

  const handlerClickTranslateSwitch = () => {
    setTranslateShow(!isTranslateShow);
  };

  const handlerClickResetRepeatHardWords = () => {
    resetPrevPage();
    history.push(PATH.MAIN);
  };

  const handlerClickVoteButton = ({ target }) => {
    setControlsState({ ...controlsState, isVotePanelShow: false });

    const voteResult = getUserRate(target);
    const isRepeat = voteResult === DIFFICULTY_REPEAT_VALUE;

    if (isRepeat && cntLearnErrors === 0) {
      setWordsQueue([...wordsQueue, wordsQueue[0]]);
    }

    const { difficulty } = wordsQueue[0];
    const newWordDifficulty = getNewWordDifficulty(difficulty, voteResult, cntLearnErrors);

    onVoteButton(wordsQueue[0], newWordDifficulty, isRepeat);
    nextBtn.current.focus();
  };

  const handlerClickDeleteWord = () => {
    onDeleteButton(wordsQueue[0]);
    goToNextWord();
  };

  const handlerClickHardWord = () => {
    const woradMarkedAsHard = wordHandler(wordsQueue[0], [
      { key: WORD_HANDLER_KEYS.isHard, value: true },
      { key: WORD_HANDLER_KEYS.countRepeatsWordAllTime, value: 1 },
    ]);

    onHardButton(woradMarkedAsHard);
  };

  useEffect(() => {
    if (isAnswerShowed) {
      CheckEnteredWord();
    }

    if (controlsState.isNextBtnShow) {
      nextBtn.current.focus();
    }
  }, [controlsState.isNextBtnShow, isAnswerShowed, CheckEnteredWord]);

  const isTranslateNeed = controlsState.isTranslateShow && isTranslateShow;
  const translateIcoColor = isTranslateShow ? 'secondary' : 'default';

  const translateWordClasses = classNames(styles.WordCard__word, {
    [styles['Block--hide']]: !(isTranslateNeed || isWordTranslateShow || isWordGuessed),
  });

  const isTranslateExampleShow = isTranslateNeed && isTextExampleShow;
  const isTranslateMeaningShow = isTranslateNeed && isTextMeaningShow;

  const imageClasses = classNames(styles.WordCard__image, {
    [styles['WordCard__image--hide']]: !isImageShow,
    [styles['WordCard__image--show']]: isImageShow,
  });

  const isVoteButtonsPanelShow =
    controlsState.isVotePanelShow && !isAnswerShowed && isFeedBackButtonsShow;

  if (!wordsQueue[0]) {
    return (
      <Dialog
        isOpen
        type="info"
        tittle={WORDS_END.tittle}
        message={isDemoQueue ? HARD_WORDS_END.message : WORDS_END.message}
        callBack={redirectToMainPage}
      />
    );
  }

  const FocusedWordInput = forwardRef((props, ref) => {
    return (
      <WordInput
        word={word}
        handleInputChange={handleInputChange}
        enteredWord={enteredWord}
        isInputDisable={controlsState.isInputDisable}
        isFocusNeed={isAnswerBtnShow}
        ref={ref}
      />
    );
  });

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <CardMedia className={imageClasses} image={imageUrl} title="Изучаемое слово" />
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item>
              {(isWordTranslateShow || isWordGuessed) && (
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
        </Grid>
      </Grid>
      <CardContent className={styles.WordCard__content}>
        <Box mb={2}>
          <form onSubmit={handlerSubmit}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                {isHardWordBtnShow && (
                  <Tooltip title="Добавить слово в 'Сложные'" aria-label="add" enterDelay={1000}>
                    <Fab onClick={handlerClickHardWord} color="primary" size="small">
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                )}
              </Grid>
              <Grid item className={styles.WordCard__input}>
                <FocusedWordInput />
                {checkerState.isShow && (
                  <WordColoredChecker
                    isVisible={checkerState.isWorking}
                    word={word}
                    wordToCheck={wordToCheck}
                  />
                )}
                {isVoteButtonsPanelShow && (
                  <VoteButtonsPanel handlerClick={handlerClickVoteButton} />
                )}
              </Grid>
              <Grid item>
                <Tooltip title="Проверить слово" aria-label="add" enterDelay={1000}>
                  <Fab onClick={handlerClickCheckWord} type="submit" color="primary" size="small">
                    <CheckIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              {isAudioShow && (
                <Grid item>
                  <Tooltip title="Произнести слово" aria-label="add" enterDelay={1000}>
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
              <Button
                variant="contained"
                color="primary"
                onClick={handlerClickNextWord}
                ref={nextBtn}
              >
                Следующее слово
              </Button>
            </Grid>
          )}
        </Grid>
        {isDelFromLearnBtnShow && (
          <Box position="absolute">
            <Tooltip title="Удалить слово из изучения" enterDelay={1000}>
              <IconButton aria-label="delete" onClick={handlerClickDeleteWord}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box position="absolute" className={styles['WordCard__mute-btn']} right="16px">
          <Tooltip title="Отключить автовоспроизведение" enterDelay={1000}>
            <IconButton onClick={handlerClickMuteSwitch} aria-label="mute">
              <SoundIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Box position="absolute" className={styles['WordCard__translate-btn']} right="52px">
          <Tooltip title="Не показывать перевод" enterDelay={1000}>
            <IconButton
              onClick={handlerClickTranslateSwitch}
              color={translateIcoColor}
              aria-label="translate"
            >
              <TranslateIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {isDemoQueue && (
          <Box position="absolute" className={styles['WordCard__translate-btn']} top="5px">
            <Tooltip title="Отменить повторение сложных слов" enterDelay={500}>
              <IconButton onClick={handlerClickResetRepeatHardWords} aria-label="reset-hard">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </CardActions>
      {isModalOpen && isDemoQueue && (
        <Dialog
          isOpen={isModalOpen}
          type="info"
          tittle={WORDS_END.tittle}
          message={HARD_WORDS_END.message}
          callBack={redirectToMainPage}
        />
      )}
      {isModalOpen && !isDemoQueue && (
        <ShortStatisticsDialog isOpen={isModalOpen} isWordsRemain={wordsQueue.length > 0} />
      )}
    </Card>
  );
};

WordCard.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  onDeleteButton: PropTypes.func.isRequired,
  onHardButton: PropTypes.func.isRequired,
  onCheckEnteredWord: PropTypes.func.isRequired,
  onVoteButton: PropTypes.func.isRequired,
  queue: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDemoQueue: PropTypes.bool.isRequired,
  resetPrevPage: PropTypes.func.isRequired,
};
export default WordCard;
