import React from 'react';

import { Grid, Typography, makeStyles, List } from '@material-ui/core';
import PromoInformation from '../../constants/Promo-information.json';
import Details from '../../components/Details';
import styles from './PromoPage.module.scss';

const useStyles = makeStyles({
  root: {
    marginBottom: '30px',
  },
  root1: {
    margin: '30px auto',
    textAlign: 'justify',
    maxWidth: '1000px',
  },
});

const PromoPage = () => {
  const classes = useStyles();

  return (
    <>
      <Typography classes={{ root: classes.root }} variant="h5" component="h2" align="center">
        Промо страница
      </Typography>
      <List classes={{ root: classes.root1 }}>
        <p>
          RS-lang – уникальный сервис для изучения английского языка для русскоговорящих
          пользователей. Нас уже 8, но скоро нас станет легион. Бойся нас, ведь мы скоро как
          заговорим!
        </p>
        <p>
          Изучай слова, играй в игры. Только не останавливайся. И да. Мы следим за тобой. Псс-псс..
          Можем поделиться результатами. Ищи статистику в приложении!
        </p>
        <p>
          Бесконечно можно смотреть на огонь, воду и экран регистрации нашего приложения. Если вы
          остановитесь на нем, мы вас простим!
        </p>
        <p>
          А если ты уже взрослый и не любишь игры, то можно просто учить слова по карточкам. Там и
          слово, и перевод, и пример использования. И даже картинка! Но если ты не только взрослый,
          но и серьезный, и тебе не нужны картинки, то все это можно выключить в настройках.
        </p>
        <p>
          Все изученные слова попадают в словарь, где отображается уровень изученности слова и дата
          его следующего повторения. Да-да. Интервальное повторение. По сверхсекретной методике,
          которую знает лишь один человек в мире! Не упусти свой шанс прокачать словарный запас.
        </p>
      </List>
      <Grid className={styles.PromoPage} container>
        <Grid className={styles.PromoPage__textContainer}>
          {PromoInformation.map(({ heading, paragraphs, lists }, index) => {
            const id = `Details_${index}`;
            return (
              <Details
                heading={heading}
                paragraphs={paragraphs || []}
                lists={lists || []}
                key={id}
              />
            );
          })}
        </Grid>
        <Grid className={styles.PromoPage__videoContainer}>123</Grid>
      </Grid>
    </>
  );
};

export default PromoPage;
