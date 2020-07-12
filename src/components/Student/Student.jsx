import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardMedia, Grid, Button, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import gitImg from '../../img/git.png';

import style from './Student.module.scss';

const contributionWrapper = makeStyles({
  root: {
    margin: '0 10px',
  },
});

const Student = ({ name, linkGit, imgSrc, headerTextCard, type, contribution }) => {
  const margin = contributionWrapper();

  const typeCard = classNames({
    [style['Student__wrapper-mentor']]: type.toLowerCase() === 'mentor',
    [style['Student__wrapper-developer']]: type.toLowerCase() === 'developer',
  });
  const typeHeaderCard = classNames({
    [style['Student__header-mentor']]: type.toLowerCase() === 'mentor',
    [style['Student__header-team-leader']]: type.toLowerCase() === 'team-leader',
    [style['Student__header-developer']]: type.toLowerCase() === 'developer',
  });

  const contributionParts = contribution.split('^');
  const contributions = contributionParts.map((text, index) => {
    const key = `Student__${text}-${index}`;

    return (
      <Typography classes={margin} key={key} variant="body1" gutterBottom align="left">
        {`• ${text}`}
      </Typography>
    );
  });

  return (
    <Grid className={typeCard}>
      <Card className={style.Student}>
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
          <CardMedia className={style['Student__img-student']} image={imgSrc} title="photo" />
          <Typography
            className={style['Student__name-student']}
            gutterBottom
            variant="h6"
            component="h2"
          >
            {name}
          </Typography>
          {contributions}
        </CardActionArea>
        <Button className={style['Student__wrapper-icon-link']} size="small" color="primary">
          <a
            className={style.Student__link}
            href={linkGit}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={style['Student__img-git']}
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
  contribution: PropTypes.string.isRequired,
};
export default Student;
