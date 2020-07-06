import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardMedia, Grid, Button, Typography } from '@material-ui/core/';

import classNames from 'classnames';
import gitImg from '../../img/git.png';

import style from './Student.module.scss';

const Student = ({ name, linkGit, imgSrc, headerTextCard, type }) => {
  const typeCard = classNames({
    [style['CardStudent__wrapper-mentor']]: type.toLowerCase() === 'mentor',
    [style['CardStudent__wrapper-developer']]: type.toLowerCase() === 'developer',
  });
  const typeHeaderCard = classNames({
    [style['CardStudent__header-mentor']]: type.toLowerCase() === 'mentor',
    [style['CardStudent__header-team-leader']]: type.toLowerCase() === 'team-leader',
    [style['CardStudent__header-developer']]: type.toLowerCase() === 'developer',
  });
  return (
    <Grid className={typeCard}>
      <Card className={style.CardStudent}>
        <CardActionArea>
          <Typography
            className={typeHeaderCard}
            variant="h6"
            component="h2"
            gutterBottom
            align="center"
          >
            {headerTextCard}
          </Typography>
          <CardMedia className={style['CardStudent__img-student']} image={imgSrc} title="photo" />
          <Typography
            className={style['CardStudent__name-student']}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {name}
          </Typography>
        </CardActionArea>
        <Button className={style['CardStudent__wrapper-icon-link']} size="small" color="primary">
          <a
            className={style.CardStudent__link}
            href={linkGit}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={style['CardStudent__img-git']}
              width="40"
              height="40"
              src={gitImg}
              alt="git"
            />
          </a>
        </Button>
      </Card>
    </Grid>
  );
};

Student.propTypes = {
  name: PropTypes.string.isRequired,
  linkGit: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  headerTextCard: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default Student;
