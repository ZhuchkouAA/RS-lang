import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import styles from './SymbolWindow.module.scss';

const SymbolWindow = ({ text, id, handlerClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div id={id} onClick={handlerClick} onKeyDown={handlerClick} className={styles.symbol}>
      <Typography>{text}</Typography>
    </div>
  );
};

SymbolWindow.defaultProps = {
  text: '',
};

SymbolWindow.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number.isRequired,
  handlerClick: PropTypes.func.isRequired,
};

export default SymbolWindow;
