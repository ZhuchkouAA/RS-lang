import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';

import styles from './AppSectionCard.module.scss';

const AppSectionCard = ({ path, name, description }) => {
  return (
    <Grid item className={styles.AppSectionCard}>
      <NavLink className={styles.AppSectionCard__link} to={path}>
        <Box>
          <Typography align="center" gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography
            className={styles.AppSectionCard__text}
            align="center"
            gutterBottom
            variant="body2"
          >
            {description}
          </Typography>
        </Box>
      </NavLink>
    </Grid>
  );
};

AppSectionCard.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AppSectionCard;
