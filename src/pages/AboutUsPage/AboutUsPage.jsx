import React from 'react';

import style from './AboutUsPage.module.scss';

import Student from '../../components/Student/index';

import studentsInformation from '../../constants/AboutUsInformation';

const AboutUsPage = () => {
  const studentsInformationZ = studentsInformation.map((game) => {
    const { name, linkGit, imgSrc } = game;
    return <Student name={name} linkGit={linkGit} imgSrc={imgSrc} key={334} />;
  });

  return (
    <div>
      <p>AboutUsPage</p>
      {studentsInformationZ}
      <div className={style.DescriptionText}>
        Description Description Description Description Description DescriptionDescription
        Description Description Description Description DescriptionDescription Description
        Description Description Description DescriptionDescription Description Description
        Description Description DescriptionDescription Description Description Description
        Description DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description
        DescriptionDescription Description Description Description Description Description
      </div>
    </div>
  );
};

export default AboutUsPage;
