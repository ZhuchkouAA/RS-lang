import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import { VOTE_BUTTON } from '../../constants/common';
import styles from './VoteButtonsPanel.module.scss';

const useStyles = makeStyles({
  root: {
    width: '300px',
  },
});

const VoteButtonsPanel = ({ handlerClick }) => {
  const classes = useStyles();
  const panelClasses = classNames(styles.VoteButtonsPanel, classes.root);

  return (
    <Grid container className={panelClasses}>
      {VOTE_BUTTON.map(({ title }, index) => {
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
};

export default VoteButtonsPanel;
