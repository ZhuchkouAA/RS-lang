import React from 'react';

import Grid from '@material-ui/core/Grid';
import style from './AboutUsPage.module.scss';

import Student from '../../components/Student/index';

import informationStudentArray from '../../constants/AboutUsInformation';

const AboutUsPage = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {informationStudentArray.map(({ name, linkGit, imgSrc }) => (
        <Student name={name} linkGit={linkGit} imgSrc={imgSrc} key={334} />
      ))}
      <div className={style.Description}>
        Description Description Description Description Description Description Description
        Description Description Description Description DescriptionDescription Description
        Description Description Description DescriptionDescription Description Description
        Description Description DescriptionDescription Description Description Description
        Description DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description Description
      </div>
    </Grid>
  );
};

export default AboutUsPage;
