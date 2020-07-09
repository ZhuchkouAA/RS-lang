import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import './SuperBackground.module.scss';

const SuperBackground = ({ opacity }) => {
  const useStyles = makeStyles({
    superBackground: {
      position: 'fixed',
      width: '100%',
      height: '120%',
      opacity,
      top: '-20%',
      'z-index': '-1',
    },
  });

  const classes = useStyles();
  return (
    <>
      <iframe
        id="superBackground"
        src="https://cdpn.io/at80/fullpage/tqdmv"
        title="background"
        className={classes.superBackground}
      />
    </>
  );
};

SuperBackground.defaultProps = {
  opacity: 1,
};

SuperBackground.propTypes = {
  opacity: PropTypes.number,
};

export default SuperBackground;
