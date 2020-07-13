import React from 'react';

import Grid from '@material-ui/core/Grid';
import PromoInformation from '../../constants/Promo-information.json';
import Details from '../../components/Details';
import styles from './PromoPage.module.scss';

const PromoPage = () => {
  return (
    <Grid className={styles.PromoPage}>
      <Grid className={styles['promoPage__container-desriptions']}>
        {PromoInformation.map(({ heading, paragraphs, lists, id }) => (
          <Details
            heading={heading}
            paragraphs={paragraphs || []}
            lists={lists || []}
            key={`Details_${id}`}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PromoPage;
