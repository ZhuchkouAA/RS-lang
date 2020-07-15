import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Typography } from '@material-ui/core';
import classNames from 'classnames';

import ChartSplineArea from '../../components/ChartSplineArea';
import { onlyLearned, onlyStudying } from '../../helpers/games-utils/filtersAndSorters';
import { getRatingColorStyleName } from '../../helpers/repeat-logic-utils';
import { DELTA, MSEC_PER_DAY, MSEC_PER_HOUR } from '../../constants/common';

import styles from './StatisticPage.module.scss';

const StatisticPage = ({ settings, progress, serverSynchronization, isLoading }) => {
  const AMOUNT_ALL_WORDS = 3600;
  const {
    differentCardsShowedAllTime,
    cardsShowedAllTime,
    rightAnswersAllTime,
    dateOfReceiptOfWords,
    leftNewWordsToday,
    queueRepeatWords,
    leftRepeatWordsToday,
    longestTodaySeries,
    learnedWordsStatistic,
    cardsShowedStatistic,
    newCardsShowedStatistic,
    rightAnswersStatistic,
    sprintAllAnswersStatistic,
    sprintRightAnswersStatistic,
    sprintMaxScoreStatistic,
    savannaAllAnswersStatistic,
    savannaRightAnswersStatistic,
    savannaFullLiveStatistic,
  } = progress;

  const { wordsPerDay, newWordsPerDay } = settings;

  useEffect(() => {
    serverSynchronization();
  }, []);

  const chartDayDateByInd = (ind) => {
    const date = Date.now() - ind * MSEC_PER_DAY;
    const day = new Date(date).getDate();
    return day;
  };

  const dataChartSavannaRightAnswersPercentStatistic = savannaRightAnswersStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round((el / (savannaAllAnswersStatistic[ind] + DELTA)) * 100),
      };
    })
    .reverse();

  const dataChartSavannaFullLivesStatistic = savannaFullLiveStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round((el / (sprintAllAnswersStatistic[ind] + DELTA)) * 100),
      };
    })
    .reverse();

  const dataChartSprintMaxScoreStatistic = sprintMaxScoreStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: el,
      };
    })
    .reverse();

  const dataChartSprintRightAnswertPercentStatistic = sprintRightAnswersStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round((el / (sprintAllAnswersStatistic[ind] + DELTA)) * 100),
      };
    })
    .reverse();

  const dataChartRightAnswersPercentStatistic = rightAnswersStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round((el / (cardsShowedStatistic[ind] + DELTA)) * 100),
      };
    })
    .reverse();

  const chartDateByProgressArray = (progressArray) => {
    return progressArray
      .map((el, ind) => {
        return { day: chartDayDateByInd(ind), cards: el };
      })
      .reverse();
  };

  const dataChartlearnedWordsStatistic = chartDateByProgressArray(learnedWordsStatistic);

  const dataChartCardsShowedStatistic = chartDateByProgressArray(cardsShowedStatistic);

  const dataChartrightAnswersStatistic = chartDateByProgressArray(rightAnswersStatistic);

  const dataChartNewCardsShowedStatistic = chartDateByProgressArray(newCardsShowedStatistic);

  const learnedWordsAllTime = onlyLearned(queueRepeatWords).length;
  const onlyStudyingWords = onlyStudying(queueRepeatWords).length;
  const rightAnswersPercentAllTime = Math.round(
    (rightAnswersAllTime / (cardsShowedAllTime + DELTA)) * 100
  );
  const rightAnswersToday = Math.round(
    (rightAnswersStatistic[0] / (cardsShowedStatistic[0] + DELTA)) * 100
  );
  const hoursToReceiptWords = Math.round((dateOfReceiptOfWords - Date.now()) / MSEC_PER_HOUR);
  const differentCardsShowedAllTimePercent =
    Math.round((differentCardsShowedAllTime / AMOUNT_ALL_WORDS) * 1000) / 10;
  const learnedWordsAllTimePercent =
    Math.round((learnedWordsAllTime / AMOUNT_ALL_WORDS) * 1000) / 10;

  const answerRatingColor = getRatingColorStyleName(rightAnswersToday);
  const answerClasses = classNames(styles[answerRatingColor]);

  const allTimeAnswerRatingColor = getRatingColorStyleName(rightAnswersPercentAllTime);
  const allTimeAnswerClasses = classNames(styles[allTimeAnswerRatingColor]);

  const differentCardsShowedAllTimeRatingColor = getRatingColorStyleName(
    differentCardsShowedAllTimePercent
  );
  const differentCardsShowedAllTimeClasses = classNames(
    styles[differentCardsShowedAllTimeRatingColor]
  );

  const learnedWordsAllTimeColor = getRatingColorStyleName(learnedWordsAllTimePercent);
  const learnedWordsAllTimeClasses = classNames(styles[learnedWordsAllTimeColor]);

  if (isLoading) return <div />;

  return (
    <div className={styles.Statistic}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Всего показано слов
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {`${cardsShowedAllTime}`}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Всего показано новых
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              <span>{`${differentCardsShowedAllTime} (`}</span>
              <span className={differentCardsShowedAllTimeClasses}>
                {differentCardsShowedAllTimePercent}
              </span>
              <span className={differentCardsShowedAllTimeClasses}>%</span>
              <span>{`) из ${AMOUNT_ALL_WORDS}`}</span>
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Выучено за все время
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              <span>{`${learnedWordsAllTime} (`}</span>
              <span className={learnedWordsAllTimeClasses}>{learnedWordsAllTimePercent}</span>
              <span className={learnedWordsAllTimeClasses}>%</span>
              <span>{`) из ${AMOUNT_ALL_WORDS}`}</span>
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Сейчас на изучении
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {`${onlyStudyingWords} (${
                Math.round((onlyStudyingWords / (DELTA + differentCardsShowedAllTime)) * 1000) / 10
              }%) из показанных`}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Правильных ответов
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              <span>{`${rightAnswersAllTime} (`}</span>
              <span className={allTimeAnswerClasses}>{rightAnswersPercentAllTime}</span>
              <span className={allTimeAnswerClasses}>%</span>
              <span>)</span>
            </Typography>
          </Grid>
        </Container>

        <Typography gutterBottom align="center" variant="h6">
          Сегодняшний прогресс:
        </Typography>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Осталось пройти новых слов сегодня
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {`${leftNewWordsToday} из ${newWordsPerDay}`}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Осталось слов на повторение сегодня
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {`${leftRepeatWordsToday} из ${wordsPerDay}`}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Всего сегодня пройдено слов
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {cardsShowedStatistic[0]}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Правильных ответов сегодня
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              <span>{`${rightAnswersStatistic[0]} (`}</span>
              <span className={answerClasses}>{rightAnswersToday}</span>
              <span className={answerClasses}>%</span>
              <span>)</span>
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Самая длинная серия сегодня
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {longestTodaySeries}
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="sm">
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography gutterBottom align="center" variant="h6">
              Новые слова прибудут через (часы)
            </Typography>
            <Typography gutterBottom align="center" variant="h6">
              {hoursToReceiptWords}
            </Typography>
          </Grid>
        </Container>

        <ChartSplineArea
          title="Процент отгаданных слов за каждый из 15 последних дней"
          data={dataChartRightAnswersPercentStatistic}
          valueField="cards"
          argumentField="day"
          name="name4"
        />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Выучено слов за каждый из 15 последних дней"
            data={dataChartlearnedWordsStatistic}
            valueField="cards"
            argumentField="day"
            name="name1"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Показано слов всего за каждый из 15 последних дней"
            data={dataChartCardsShowedStatistic}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Отгадано слов всего за каждый из 15 последних дней"
            data={dataChartrightAnswersStatistic}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Показано новых слов за каждый из 15 последних дней"
            data={dataChartNewCardsShowedStatistic}
            valueField="cards"
            argumentField="day"
            name="name3"
          />
        </Container>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Максимально очков в игре Спринт за каждый из 15 последних дней"
            data={dataChartSprintMaxScoreStatistic}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Процент правильных ответов в игре Спринт за каждый из 15 последних дней"
            data={dataChartSprintRightAnswertPercentStatistic}
            valueField="cards"
            argumentField="day"
            name="name3"
          />
        </Container>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Процент правильных ответов в игре Саванна за каждый из 15 последних дней"
            data={dataChartSavannaRightAnswersPercentStatistic}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Количество прохождений игры Саванна без ошибок за каждый из 15 последних дней"
            data={dataChartSavannaFullLivesStatistic}
            valueField="cards"
            argumentField="day"
            name="name3"
          />
        </Container>
      </Grid>
    </div>
  );
};

StatisticPage.propTypes = {
  settings: PropTypes.objectOf(PropTypes.any).isRequired,
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default StatisticPage;
