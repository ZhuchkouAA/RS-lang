import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Typography } from '@material-ui/core';

import ChartSplineArea from '../../components/ChartSplineArea';
import { onlyStudying } from '../../helpers/games-utils/filtersAndSorters';
import { DELTA, MSEC_PER_DAY, MSEC_PER_HOUR } from '../../constants/common';

const StatisticPage = ({ progress, serverSynchronization, isLoading }) => {
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
  } = progress;

  useEffect(() => {
    serverSynchronization();
  }, []);

  const chartDayDateByInd = (ind) => {
    const date = Date.now() - ind * MSEC_PER_DAY;
    const day = new Date(date).getDate();
    return day;
  };

  const dataChartRightAnswersPercentStatistic = rightAnswersStatistic
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round(el / (cardsShowedStatistic[ind] + DELTA)),
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

  const learnedWordsAllTime = onlyStudying(queueRepeatWords).length + 1;
  const rightAnswersPercentAllTime = Math.round(rightAnswersAllTime / (cardsShowedAllTime + DELTA));
  const hoursToReceiptWords = Math.round((dateOfReceiptOfWords - Date.now()) / MSEC_PER_HOUR);

  if (isLoading) return <div />;
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="md">
          <Typography gutterBottom align="center" variant="h6">
            {`Всего  показано новых слов -- ${differentCardsShowedAllTime}!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`На изучении ${learnedWordsAllTime} слов из 3600, правильных ответов -- ${rightAnswersPercentAllTime}%!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            Сегодняшний прогресс:
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Осталось изучить новых слов сегодня -- ${leftNewWordsToday}!
            Осталось слов на повторение сегодня -- ${leftRepeatWordsToday}!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Всего сегодня было показано ${cardsShowedStatistic[0]} карточек!
            Правильных ответов сегодня -- ${rightAnswersStatistic[0]} или ${
              rightAnswersStatistic[0] / (cardsShowedStatistic[0] + DELTA)
            }%`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Самая длинная серия правильных ответов сегодня -- ${longestTodaySeries}`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Карточки с новыми словами прибудут в течение ${hoursToReceiptWords} часов!`}
          </Typography>
        </Container>
        <ChartSplineArea
          title="Процент отгаданных карточек за каждый из 15 последних дней"
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
            title="Показано карточек всего за каждый из 15 последних дней"
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
            title="Отгадано карточек всего за каждый из 15 последних дней"
            data={dataChartrightAnswersStatistic}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Показано новых карточек за каждый из 15 последних дней"
            data={dataChartNewCardsShowedStatistic}
            valueField="cards"
            argumentField="day"
            name="name3"
          />
        </Container>
      </Grid>
    </>
  );
};

StatisticPage.propTypes = {
  progress: PropTypes.objectOf(PropTypes.any).isRequired,
  serverSynchronization: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default StatisticPage;
