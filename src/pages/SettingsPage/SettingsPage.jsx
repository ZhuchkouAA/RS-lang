import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PATH from '../../constants/path';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';

const SettingsPage = (props) => {
  const { cardsPerDay } = props;
  return (
    <>
      <NavLink to={PATH.SIGN_IN}>SignInPage</NavLink>
      <p>Application settings</p>

      <Input label="Cards per day" value={cardsPerDay} />
      <Input label="New words per day" value="12" />
      <Checkbox label="'Show answer' button" checkValue="" />
      <Checkbox label="'Delete from learning' button" checkValue="checked" />
      <Checkbox label="'Feedback' buttons" checkValue="checked" />

      <p>Cards desing</p>
      <Checkbox label="Picture" checkValue="" />
      <Checkbox label="Transcription" checkValue="" />
      <Checkbox label="Translation" checkValue="" />
      <Checkbox label="Listen meaning" checkValue="" />
      <Checkbox label="Listen example" checkValue="" />
      <Checkbox label="Show meaning" checkValue="" />
      <Checkbox label="Show example" checkValue="" />
      <button type="submit">Save</button>
    </>
  );
};

SettingsPage.propTypes = {
  cardsPerDay: PropTypes.number.isRequired,
};

export default connect((state) => ({ ...state.testData }))(SettingsPage);
