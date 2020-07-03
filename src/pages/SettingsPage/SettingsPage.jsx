import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Toggle from '../../components/Toggle';
import Inputs from '../../components/Input';

import style from './SettingsPage.module.scss';

const SettingsPage = ({ settings: storeSettings, putSettings }) => {
  const [settings, setSettings] = useState(storeSettings);

  const onSaveButton = (event) => {
    event.preventDefault();
    putSettings(settings);
  };

  return (
    <form className={style.Settings}>
      <Grid
        className={style.Settings__wrapper}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <p className={style.Settings__title}>Настройки приложения</p>

        <Inputs
          label="Учить слова за один день"
          value={settings.wordsPerDay}
          onChange={(e) => setSettings({ ...settings, wordsPerDay: e.target.value })}
        />
        <Inputs
          label="Новых слов в день"
          value={settings.newWordsPerDay}
          onChange={(e) => setSettings({ ...settings, newWordsPerDay: e.target.value })}
        />
        <Toggle
          label="Кнопка 'Показать ответ'"
          checkValue={settings.isAnswerBtnShow}
          toggle={() => setSettings({ ...settings, isAnswerBtnShow: !settings.isAnswerBtnShow })}
        />
        <Toggle
          label="Кнопка 'Удалить из изучения'"
          checkValue={settings.isDelFromLearnBtnShow}
          toggle={() =>
            setSettings({ ...settings, isDelFromLearnBtnShow: !settings.isDelFromLearnBtnShow })
          }
        />
        <Toggle
          label="Кнопки 'Оценить сложность слова'"
          checkValue={settings.isFeedBackButtonsShow}
          toggle={() =>
            setSettings({ ...settings, isFeedBackButtonsShow: !settings.isFeedBackButtonsShow })
          }
        />
      </Grid>

      <Grid
        className={style.Settings__wrapper}
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <p className={style.Settings__title}>Элементы карточки</p>
        <Toggle
          label="Показывать картинку"
          checkValue={settings.isImageShow}
          toggle={() => setSettings({ ...settings, isImageShow: !settings.isImageShow })}
        />
        <Toggle
          label="Показывать транскрипцию"
          checkValue={settings.isTranscriptionShow}
          toggle={() =>
            setSettings({ ...settings, isTranscriptionShow: !settings.isTranscriptionShow })
          }
        />
        <Toggle
          label="Показывать перевод"
          checkValue={settings.isWordTranslateShow}
          toggle={() =>
            setSettings({ ...settings, isWordTranslateShow: !settings.isWordTranslateShow })
          }
        />
        <Toggle
          label="Перевод предложения"
          checkValue={settings.isTextExampleTranslateShow}
          toggle={() =>
            setSettings({
              ...settings,
              isTextExampleTranslateShow: !settings.isTextExampleTranslateShow,
            })
          }
        />
        <Toggle
          label="Перевод значения"
          checkValue={settings.isAudioMeaningShow}
          toggle={() =>
            setSettings({ ...settings, isAudioMeaningShow: !settings.isAudioMeaningShow })
          }
        />
        <Toggle
          label="Кнопка 'прослушать слово'"
          checkValue={settings.isAudioShow}
          toggle={() => setSettings({ ...settings, isAudioShow: !settings.isAudioShow })}
        />
        <Toggle
          label="Кнопка 'прослушать предложение'"
          checkValue={settings.isAudioExampleShow}
          toggle={() =>
            setSettings({ ...settings, isAudioExampleShow: !settings.isAudioExampleShow })
          }
        />
        <Toggle
          label="Кнопка 'прослушать значение'"
          checkValue={settings.isTextMeaningShow}
          toggle={() =>
            setSettings({ ...settings, isTextMeaningShow: !settings.isTextMeaningShow })
          }
        />
        <Toggle
          label="Показывать пример использования"
          checkValue={settings.isTextExampleShow}
          toggle={() =>
            setSettings({ ...settings, isTextExampleShow: !settings.isTextExampleShow })
          }
        />
      </Grid>
      <div className={style.Settings__btn}>
        <Button
          className={style.Settings__btn}
          variant="outlined"
          color="secondary"
          onClick={onSaveButton}
        >
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};

SettingsPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
  putSettings: PropTypes.func.isRequired,
};

export default SettingsPage;
