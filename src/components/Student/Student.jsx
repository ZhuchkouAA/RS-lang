import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import style from './Student.module.scss';

import studentPhotoSrc from '../../img/artworks.jpg';
import gitimg from '../../img/git.png';

const Student = ({ year, hobby, contribution }) => {
  const contribut = contribution.map((element) => (
    <li className={style.ContributionStudent}>{element}</li>
  ));
  return (
    <section>
      <div>
        <div className={style.ContainerStudent}>
          <Card className={style.CardStudent}>
            <CardActionArea>
              <CardMedia className={style.ImgStudent} image={studentPhotoSrc} title="photo" />
              <Typography className={style.NameStudent} gutterBottom variant="h5" component="h2">
                Name
              </Typography>
            </CardActionArea>
            <Button className={style.LinkIconWrapper} size="small" color="primary">
              <a href="signin">
                <img width="50" height="50" src={gitimg} alt="git" />
              </a>
            </Button>
            <Button className={style.LinkIconWrapper} size="small" color="primary">
              <a href="signin">
                <img width="50" height="50" src={gitimg} alt="git" />
              </a>
            </Button>
            <Button className={style.LinkIconWrapper} size="small" color="primary">
              <a href="signin">
                <img width="50" height="50" src={gitimg} alt="git" />
              </a>
            </Button>
          </Card>
          <div className={style.StudentInformationContainer}>
            <p className={style.StudentInformation}>
              Year:
              <span>{year}</span>
            </p>
            <p className={style.StudentInformation}>
              Hobby:
              <span>{hobby}</span>
            </p>
            <details className={style.StudentInformation}>
              <summary className={style.StudentInformation__listHeader}>Contribution</summary>
              <ul className={style.StudentInformation__list}>{contribut}</ul>
            </details>
          </div>
        </div>
        <div className={style.Strip} />
      </div>
    </section>
  );
};

Student.propTypes = {
  year: PropTypes.string.isRequired,
  hobby: PropTypes.string.isRequired,
  contribution: PropTypes.string.isRequired,
};

export default Student;
