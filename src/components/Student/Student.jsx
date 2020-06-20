import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from './Student.module.scss';

import gitImg from '../../img/git.png';

const Student = ({ name, linkGit, imgSrc }) => {
  return (
    <section>
      <Grid
        className={style.CardStudent}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Card className={style.CardStudent}>
          <CardActionArea>
            <CardMedia className={style.ImgStudent} image={imgSrc} title="photo" />
            <Typography className={style.NameStudent} gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardActionArea>
          <Button className={style.LinkIconWrapper} size="small" color="primary">
            <a href={linkGit}>
              <img width="100" height="100" src={gitImg} alt="git" />
            </a>
          </Button>
        </Card>
        <div className={style.Strip} />
      </Grid>
    </section>
  );
};

Student.propTypes = {
  name: PropTypes.string.isRequired,
  linkGit: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};
export default Student;
