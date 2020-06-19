import React from 'react';

import style from './AboutUsPage.module.scss';

import Student from '../../components/Student/index';

const AboutUsPage = () => {
  return (
    <div>
      <p>AboutUsPage</p>
      <Student
        year="27"
        hobby="sport, swimming, dance"
        contribution={['deld', 'restart', 'on', 'e over']}
        photo="../../img/Araik.jpg"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['tatata', 'ff', 'on', 'gamr']}
        photo="../../img/git.png"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['dted', 'rtart', 'n', 'gamf']}
        photo="../../img/33.jpg"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['dted', 'rtart', 'n', 'gamf']}
        photo="../../img/33.jpg"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['dted', 'rtart', 'n', 'gamf']}
        photo="../../img/33.jpg"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['dted', 'rtart', 'n', 'gamf']}
        photo="../../img/33.jpg"
      />
      <Student
        year="20"
        hobby="tututu"
        contribution={['dted', 'rtart', 'n', 'gamf']}
        photo="../../img/33.jpg"
      />
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
