import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import style from './AboutUsPage.module.scss';

import Student from '../../components/Student';

import informationStudentArray from '../../constants/About-us-information.json';

const AboutUsPage = () => {
  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Над приложением работали
      </Typography>
      <Grid className={style.AboutUsPage} container justify="center">
        {informationStudentArray.map(
          ({ name, linkGit, imgSrc, headerTextCard, type, contribution }) => (
            <Student
              name={name}
              linkGit={linkGit}
              imgSrc={imgSrc}
              key={`AboutUsPage-${name}`}
              headerTextCard={headerTextCard}
              type={type}
              contribution={contribution || ''}
            />
          )
        )}
      </Grid>
    </div>
  );
};

export default AboutUsPage;
