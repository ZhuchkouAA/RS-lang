import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Checkbox from '../../components/Checkbox';
import Inputs from '../../components/Input';

import style from './SettingsPage.module.scss';

const SettingsPage = (props) => {
  const [settings, setSettings] = useState(props);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className={style.Settings}>
      <div className={style.Settings__wrapper}>
        <p className={style.settings__title}>Application settings</p>

        <Inputs
          label="Cards per day"
          value={settings.cardsPerDay}
          onChange={(e) => setSettings({ ...settings, cardsPerDay: e.target.value })}
        />
        <Inputs
          label="New words per day"
          value={settings.newWordsPerDay}
          onChange={(e) => setSettings({ ...settings, newWordsPerDay: e.target.value })}
        />
        <Checkbox
          label="'Show answer' button"
          checkValue={settings.answerBtn}
          toggle={() => setSettings({ ...settings, answerBtn: !settings.answerBtn })}
        />
        <Checkbox
          label="'Delete from learning' button"
          checkValue={settings.delFromLearnBtn}
          toggle={() => setSettings({ ...settings, delFromLearnBtn: !settings.delFromLearnBtn })}
        />
        <Checkbox
          label="'Feedback' buttons"
          checkValue={settings.feedBackButtons}
          toggle={() => setSettings({ ...settings, feedBackButtons: !settings.feedBackButtons })}
        />
      </div>

      <div className={style.Settings__wrapper}>
        <p className={style.settings__title}>Cards desing</p>
        <Checkbox
          label="Picture"
          checkValue={settings.image}
          toggle={() => setSettings({ ...settings, image: !settings.image })}
        />
        <Checkbox
          label="Transcription"
          checkValue={settings.transcription}
          toggle={() => setSettings({ ...settings, transcription: !settings.transcription })}
        />
        <Checkbox
          label="Translation of word"
          checkValue={settings.wordTranslate}
          toggle={() => setSettings({ ...settings, wordTranslate: !settings.wordTranslate })}
        />
        <Checkbox
          label="Translation of example"
          checkValue={settings.textExampleTranslate}
          toggle={() =>
            // eslint-disable-next-line prettier/prettier
            setSettings({ ...settings, textExampleTranslate: !settings.textExampleTranslate })}
        />
        <Checkbox
          label="Listen meaning"
          checkValue={settings.audioMeaning}
          toggle={() => setSettings({ ...settings, audioMeaning: !settings.audioMeaning })}
        />
        <Checkbox
          label="Listen example"
          checkValue={settings.audioExample}
          toggle={() => setSettings({ ...settings, audioExample: !settings.audioExample })}
        />
        <Checkbox
          label="Show meaning"
          checkValue={settings.textMeaning}
          toggle={() => setSettings({ ...settings, textMeaning: !settings.textMeaning })}
        />
        <Checkbox
          label="Show example"
          checkValue={settings.textExample}
          toggle={() => setSettings({ ...settings, textExample: !settings.textExample })}
        />
      </div>
      <div className={style.Settings__btn}>
        <Button
          className={style.Settings__btn}
          variant="outlined"
          color="secondary"
          onClick={() => handleSubmit}
        >
          Сохранить изменения
        </Button>
      </div>
    </form>
  );
};

export default connect((state) => ({ ...state.testData }))(SettingsPage);
