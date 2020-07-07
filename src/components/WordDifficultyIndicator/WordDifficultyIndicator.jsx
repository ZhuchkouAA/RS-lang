import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';

import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import Battery20Icon from '@material-ui/icons/Battery20';
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery80Icon from '@material-ui/icons/Battery80';
import Battery90Icon from '@material-ui/icons/Battery90';

import { MAX_DIFFICULTY } from '../../constants/wordConfig';
import { getRatingColors } from '../../helpers/repeat-logic-utils';

const WordDifficultyIndicator = ({ difficulty }) => {
  const learningLevel = MAX_DIFFICULTY - difficulty >= 0 ? MAX_DIFFICULTY - difficulty : 0;

  const iconColor = getRatingColors(learningLevel);

  const useStyles = makeStyles({
    iconColor: {
      color: iconColor.passedColor,
    },
  });

  const classes = useStyles();

  let icon = <BatteryFullIcon fontSize="small" className={classes.iconColor} />;

  if (learningLevel < 20) {
    icon = <Battery20Icon fontSize="small" className={classes.iconColor} />;
  }

  if (learningLevel >= 20 && learningLevel < 30) {
    icon = <Battery30Icon fontSize="small" className={classes.iconColor} />;
  }
  if (learningLevel >= 30 && learningLevel < 50) {
    icon = <Battery50Icon fontSize="small" className={classes.iconColor} />;
  }
  if (learningLevel >= 50 && learningLevel < 60) {
    icon = <Battery60Icon fontSize="small" className={classes.iconColor} />;
  }
  if (learningLevel >= 60 && learningLevel < 80) {
    icon = <Battery80Icon fontSize="small" className={classes.iconColor} />;
  }
  if (learningLevel >= 80 && learningLevel < 90) {
    icon = <Battery90Icon fontSize="small" className={classes.iconColor} />;
  }

  return (
    <span>
      <Tooltip title={`Уровень изученности слова: ${learningLevel}.`} enterDelay={1000}>
        {icon}
      </Tooltip>
    </span>
  );
};

WordDifficultyIndicator.defaultProps = {
  difficulty: 0,
};

WordDifficultyIndicator.propTypes = {
  difficulty: PropTypes.string,
};

export default WordDifficultyIndicator;
