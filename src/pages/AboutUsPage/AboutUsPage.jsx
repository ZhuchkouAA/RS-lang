import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import style from './AboutUsPage.module.scss';

import Student from '../../components/Student';

import informationStudentArray from '../../constants/About-us-information.json';

const AboutUsPage = () => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Над приложением работали
      </Typography>
      <Grid className={style.Students__container} container justify="center">
        {informationStudentArray.map(({ name, linkGit, imgSrc }) => (
          <Student
            name={name}
            linkGit={linkGit}
            imgSrc={imgSrc}
            key={`AboutUsPage_student-${name}`}
          />
        ))}
      </Grid>
    </>
  );
};

export default AboutUsPage;
