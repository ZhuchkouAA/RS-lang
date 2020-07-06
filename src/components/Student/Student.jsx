import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActionArea, CardMedia, Grid, Button, Typography } from '@material-ui/core/';

import gitImg from '../../img/git.png';

import style from './Student.module.scss';

const Student = ({ name, linkGit, imgSrc }) => {
  return (
    <Grid className={style.CardStudent__wrapper}>
      <Card className={style.CardStudent}>
        <CardActionArea>
          <CardMedia className={style['CardStudent__img-student']} image={imgSrc} title="photo" />
          <Typography
            className={style['CardStudent__name-student']}
            gutterBottom
            variant="h5"
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
              width="60"
              height="60"
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
};
export default Student;
