import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, Typography, Container } from '@material-ui/core';

import Toggle from '../../components/Toggle';
import Inputs from '../../components/Input';

import style from './SettingsPage.module.scss';

const countHintsFromSettings = ({ isWordTranslateShow, isTextMeaningShow, isTextExampleShow }) => {
  return [isWordTranslateShow, isTextMeaningShow, isTextExampleShow].reduce(
    (accum, item) => (item ? accum + 1 : accum),
    0
  );
};

const SettingsPage = ({
  settings: storeSettings,
  isLoading,
  progress,
  putProgress,
  putSettings,
  hardReset,
  serverSynchronization,
  setLeftNewWordsToday,
  setLeftRepeatWordsToday,
}) => {
  const countSavedHints = countHintsFromSettings(storeSettings);
  const [settings, setSettings] = useState({ ...storeSettings });
  const [isUnsavedChanges, setUnsavedChanges] = useState(false);
  const [countMainHints, setCountMainHints] = useState(countSavedHints);
  const saveBtnVariant = isUnsavedChanges ? 'contained' : 'outlined';
  const [inputPropsWords, setInputPropsWords] = useState({ style: { color: 'black' } });
  const [inputPropsNewWords, setInputPropsNewWords] = useState({ style: { color: 'black' } });

  const AMOUNT_ALL_WORDS = 3600;
  const INFINITY = 999999;
  const styleRed = { style: { color: 'red' } };
  const styleBlack = { style: { color: 'black' } };

  const timerEffect = (key, value) => {
    if (key === 'wordsPerDay') {
      setInputPropsWords(styleRed);
    }
    if (key === 'newWordsPerDay') {
      setInputPropsNewWords(styleRed);
    }
    const timer = setTimeout(() => {
      if (key === 'wordsPerDay') {
        setInputPropsWords(styleBlack);
      }
      if (key === 'newWordsPerDay') {
        setInputPropsNewWords(styleBlack);
      }
      setSettings({ ...settings, [key]: value });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    const isWordsPerDayBottomRangeValid = +settings.wordsPerDay >= +settings.newWordsPerDay;
    const isWordsPerDayTopRangeValid = +settings.wordsPerDay <= INFINITY;

    if (!isWordsPerDayBottomRangeValid) {
      return timerEffect('wordsPerDay', +settings.newWordsPerDay || 1);
    }

    if (!isWordsPerDayTopRangeValid) {
      return timerEffect('wordsPerDay', INFINITY);
    }

    return undefined;
  }, [settings.wordsPerDay]);

  useEffect(() => {
    const isNewWordsPerDayBottomRangeValid = +settings.newWordsPerDay >= 0;
    const isNewWordsPerDayTopRangeValid =
      +settings.newWordsPerDay <= +settings.wordsPerDay &&
      +settings.newWordsPerDay <= AMOUNT_ALL_WORDS;
    const newWordsPerDay =
      settings.wordsPerDay > AMOUNT_ALL_WORDS ? AMOUNT_ALL_WORDS : settings.wordsPerDay;

    if (!isNewWordsPerDayBottomRangeValid) {
      return timerEffect('newWordsPerDay', 0);
    }

    if (!isNewWordsPerDayTopRangeValid) {
      return timerEffect('newWordsPerDay', newWordsPerDay);
    }

    return undefined;
  }, [settings.newWordsPerDay]);

  useEffect(() => {
    serverSynchronization();
  }, []);

  useEffect(() => {
    setSettings(storeSettings);
  }, [storeSettings]);

  useEffect(() => {
    setCountMainHints(countSavedHints);
  }, [countSavedHints]);

  const onSaveButton = async (event) => {
    event.preventDefault();
    const leftNewWordsToday = settings.newWordsPerDay - progress.newCardsShowedStatistic[0];
    const leftRepeatWordsToday = settings.wordsPerDay - progress.cardsShowedStatistic[0];

    await setLeftNewWordsToday(leftNewWordsToday);
    await setLeftRepeatWordsToday(leftRepeatWordsToday);

    putSettings(settings);
    putProgress();
    setUnsavedChanges(false);
  };

  const onSettingsChange = (newSettings, isMainHint, step) => {
    if (isMainHint) {
      setCountMainHints(countMainHints + step);
    }

    setSettings({ ...settings, ...newSettings });
    setUnsavedChanges(true);
  };

  const onResetButton = (event) => {
    event.preventDefault();
    hardReset();
  };

  if (isLoading) return <div />;

  return (
    <form className={style.Settings}>
      <Container ClassName={style.Settings__wrapper}>
        <Grid container direction="row" justify="space-around" alignItems="flex-start">
          <div>
            <Typography variant="h6" gutterBottom>
              Общие настройки приложения
            </Typography>
            <Inputs
              label="Максимально карточек в день (без учета сегодняшнего повтора)."
              startValue={String(settings.wordsPerDay)}
              settingName="wordsPerDay"
              onChange={onSettingsChange}
              inputProps={inputPropsWords}
              required
            />
            <Inputs
              label="Новых слов в день (не может быть больше всех слов в день)."
              startValue={String(settings.newWordsPerDay)}
              settingName="newWordsPerDay"
              onChange={onSettingsChange}
              minValue={0}
              maxValue={+settings.wordsPerDay}
              inputProps={inputPropsNewWords}
              required
            />

            <Typography variant="h6" gutterBottom>
              Элементы управления
            </Typography>

            <Toggle
              label="Кнопка 'Показать ответ'"
              settingName="isAnswerBtnShow"
              checkValue={settings.isAnswerBtnShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Вводит нужное слово, со штрафом к уровню изучения.
            </Typography>
            <Toggle
              label="Кнопка 'Удалить из изучения'"
              settingName="isDelFromLearnBtnShow"
              checkValue={settings.isDelFromLearnBtnShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Удаляет слово из изучения. Восстановить слова можно в &quot;Словаре&quot;.
            </Typography>
            <Toggle
              label="Кнопка 'Добавить слово в сложные'"
              settingName="isHardWordBtnShow"
              checkValue={settings.isHardWordBtnShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Помечает слова как сложное. Сложные слова можно тренировать отдельно, запустив
              тренировку из &quot;Словаря&quot;.
            </Typography>
            <Toggle
              label="Кнопки 'Оценить сложность слова'"
              settingName="isFeedBackButtonsShow"
              checkValue={settings.isFeedBackButtonsShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              После отгадывания слова, можно оценить его сложность для более точного определения
              времени его следующего повторения.
            </Typography>
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              Подсказки
            </Typography>
            <Toggle
              label="Перевод"
              settingName="isWordTranslateShow"
              checkValue={settings.isWordTranslateShow}
              toggle={onSettingsChange}
              countHints={countMainHints}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Показывать перевод слова. А также переводы предложений со словом (если они включены).
              Можно временно отключать на карточке. Основная подсказка.
            </Typography>
            <Toggle
              label="Пример использования слова"
              settingName="isTextExampleShow"
              checkValue={settings.isTextExampleShow}
              toggle={onSettingsChange}
              countHints={countMainHints}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Показывать пример с использованием слова. Основная подсказка.
            </Typography>
            <Toggle
              label="Значение слова"
              settingName="isTextMeaningShow"
              checkValue={settings.isTextMeaningShow}
              toggle={onSettingsChange}
              countHints={countMainHints}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Показывать значение слова. Основная подсказка.
            </Typography>
            <Toggle
              label="Картинка"
              settingName="isImageShow"
              checkValue={settings.isImageShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Показывать картинку, ассоциированную со словом.
            </Typography>
            <Toggle
              label="Транскрипция"
              settingName="isTranscriptionShow"
              checkValue={settings.isTranscriptionShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              Показывать транскрипцию слова. Так же отображается в &quot;Словаре&quot;.
            </Typography>

            <Toggle
              label="Кнопка 'прослушать слово'"
              settingName="isAudioShow"
              checkValue={settings.isAudioShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              При нажатии звучит изучаемое слово.
            </Typography>
            <Toggle
              label="Кнопка 'прослушать пример использования'"
              settingName="isAudioExampleShow"
              checkValue={settings.isAudioExampleShow}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              При нажатии звучит предложение с примером использования слова.
            </Typography>
            <Toggle
              label="Кнопка 'прослушать значение  '"
              settingName="isAudioMeaning"
              checkValue={settings.isAudioMeaning}
              toggle={onSettingsChange}
            />
            <Typography className={style.Settings__hint} variant="body2" gutterBottom>
              При нажатии звучит предложение со значением слова.
            </Typography>
          </div>
        </Grid>
      </Container>
      <Grid container max-width="sm" justify="center">
        <Button
          className={style.Settings__btn}
          variant={saveBtnVariant}
          color="primary"
          onClick={onSaveButton}
        >
          Сохранить изменения
        </Button>
        <Button
          className={style.Settings__btn}
          variant="outlined"
          color="secondary"
          onClick={onResetButton}
        >
          Удалить пользователя
        </Button>
      </Grid>
    </form>
  );
};

SettingsPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  putSettings: PropTypes.func.isRequired,
  hardReset: PropTypes.func.isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  putProgress: PropTypes.func.isRequired,
  setLeftNewWordsToday: PropTypes.func.isRequired,
  setLeftRepeatWordsToday: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SettingsPage;
