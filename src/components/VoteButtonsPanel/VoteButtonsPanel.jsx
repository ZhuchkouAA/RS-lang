import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import classNames from 'classnames';

import { VOTE_BUTTON_TITLES } from '../../constants/common';
import styles from './VoteButtonsPanel.module.scss';

const VoteButtonsPanel = ({ handlerClick, isShow }) => {
  const panelClasses = classNames(styles.VoteButtonsPanel, {
    [styles.VoteButtonsPanel__show]: isShow,
  });

  return (
    <Grid container className={panelClasses}>
      {VOTE_BUTTON_TITLES.map((title, index) => {
        const key = `VoteButtonsPanel__${title}_${index}`;

        return (
          <Grid item key={key}>
            <Button color="primary" onClick={handlerClick} size="small">
              {title}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

VoteButtonsPanel.propTypes = {
  handlerClick: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
};

export default VoteButtonsPanel;
