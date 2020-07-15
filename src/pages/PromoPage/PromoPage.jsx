import React from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';

import PromoInformation from '../../constants/Promo-information.json';
import URLS from '../../constants/APIUrls';
import Details from '../../components/Details';

import gitImg from '../../img/git.png';
import styles from './PromoPage.module.scss';

const PromoPage = () => {
  return (
    <Box className={styles.PromoPage__wrapper}>
      <Typography variant="h1" align="center" gutterBottom>
        RS-lang
      </Typography>
      <Box className={styles['PromoPage__player-container']}>
        <iframe
          title="RS Lang - Promo!"
          width="100%"
          height="360"
          src={URLS.PROM_VIDEO}
          allowFullScreen
        />
      </Box>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>RS-lang</span>
        &nbsp;– уникальный сервис для изучения английского языка для русскоговорящих пользователей.
        Нас уже 8, но скоро нас станет легион. Бойся нас, ведь мы скоро как заговорим!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Бесконечно можно смотреть на огонь, воду и экран регистрации нашего приложения. Если вы
        остановитесь на нем, мы вас простим!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Изучай слова, играй в игры. Только не останавливайся. И да. Мы следим за тобой. Псс-псс..
        Можем поделиться результатами. Ищи статистику в приложении!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Все изученные слова попадают в словарь, где отображается уровень изученности слова и дата
        его следующего повторения. Да-да. Интервальное повторение. По сверхсекретной методике,
        которую полностью не знает ни один человек из команды! Не упусти свой шанс прокачать
        словарный запас.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        А если ты уже взрослый и не любишь игры, то можно просто учить слова по карточкам. Там и
        слово, и перевод, и пример использования. И даже картинка! Но если ты не только взрослый, но
        и серьезный, и тебе не нужны картинки, то все это можно выключить в настройках.
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Мы сказали игры? Да! Их есть у нас в достатке:
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Спринт. `}</span>
        Кликай по кнопкам так быстро, как не бегает Усейн Болт. Пиу-пиу. Но помни, ты должен выбрать
        верный вариант. Собирай очки и хвастайся перед друзьями результатами. Время пошло!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Саванна. `}</span>
        Слова падают, как листья. Выбери верный перевод, пока не поздно. Количество жизней
        ограничено, потому за тобой придет gray wolf. Учи английский, мы предупреждали
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Аудиовызов. `}</span>
        Слушай, что тебе говорят. Не услышал? Попробуй еще раз, и еще раз.. Мы не устанем повторять,
        мы не твоя девушка.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Фортуна. `}</span>
        Хо-хо-хо. Надейся, что тебе повезет понять, как играть в эту игру. И повезет в игре. Хотя
        постойте-ка. Может ты и так все знаешь?
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Скажи это! `}</span>
        Нет слов, одни эмоции. Зато ты будешь знать что делать, когда Сэмюэл Л. Джексон придет за
        тобой. Английский! Ты говоришь на АНГЛИЙСКОМ?!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        <span className={styles['PromoPage__game-header']}>{`Пазл (в разработке!). `}</span>
        Собери там хоть что-нибудь. Это какая-то головоломка. Буквы в слова, слова в предложения,
        предложения в буквы, слова в картинки. В общем стоит подождать, будет интересно.
      </Typography>

      <Typography variant="h6" align="center" gutterBottom>
        Ниже можно найти подробные описания и инструкции к различным частям приложения.
      </Typography>

      <Grid container className={styles.PromoPage} justify="center">
        <Grid item className={styles.PromoPage__textContainer}>
          {PromoInformation.map(({ imgSrc = false, heading, paragraphs, lists }, index) => {
            const key = `Details__${heading}-${index}`;
            return (
              <Details
                heading={heading}
                paragraphs={paragraphs || []}
                lists={lists || []}
                key={key}
                imgSrc={imgSrc}
              />
            );
          })}
        </Grid>
      </Grid>
      <Typography align="center" gutterBottom>
        А тут можно посмотреть на магию:
        <Button className={styles['PromoPage__wrapper-icon-link']} size="small" color="primary">
          <a href={URLS.REPOSITORY} target="_blank" rel="noopener noreferrer">
            <img
              className={styles['PromoPage__img-git']}
              width="40"
              height="40"
              src={gitImg}
              alt="git"
            />
          </a>
        </Button>
      </Typography>
    </Box>
  );
};

export default PromoPage;
