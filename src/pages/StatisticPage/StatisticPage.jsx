import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Typography } from '@material-ui/core';

import ChartSplineArea from '../../components/ChartSplineArea';
import { onlyStudying } from '../../helpers/games-utils/filtersAndSorters';
import { DELTA } from '../../constants/common';

const StatisticPage = ({ progress, serverSynchronization }) => {
  const {
    differentCardsShowedAllTime,
    cardsShowedAllTime,
    rightAnswersAllTime,
    dateOfReceiptOfWords,
    leftNewWordsToday,
    queueRepeatWords,
    leftRepeatWordsToday,
    cardsShowedToday,
    rightTodayAnswers,
    longestTodaySeries,
    learnedWords15Days,
    cardsShowed15Days,
    newCardsShowed15Days,
    rightAnswers15Days,
  } = progress;

  useEffect(() => {
    serverSynchronization();
  }, []);

  const chartDayDateByInd = (ind) => {
    const date = Date.now() - ind * 86400000;
    const day = new Date(date).getDate();
    return day;
  };

  const dataChartRightAnswersPercent15Days = rightAnswers15Days
    .map((el, ind) => {
      return {
        day: chartDayDateByInd(ind),
        cards: Math.round(el / (cardsShowed15Days[ind] + DELTA)),
      };
    })
    .reverse();

  const dataChartlearnedWords15Days = learnedWords15Days
    .map((el, ind) => {
      return { day: chartDayDateByInd(ind), cards: el };
    })
    .reverse();

  const dataChartCardsShowed15Days = cardsShowed15Days
    .map((el, ind) => {
      return { day: chartDayDateByInd(ind), cards: el };
    })
    .reverse();

  const dataChartrightAnswers15Days = rightAnswers15Days
    .map((el, ind) => {
      return { day: chartDayDateByInd(ind), cards: el };
    })
    .reverse();

  const dataChartNewCardsShowed15Days = newCardsShowed15Days
    .map((el, ind) => {
      return { day: chartDayDateByInd(ind), cards: el };
    })
    .reverse();

  const learnedWordsAllTime = onlyStudying(queueRepeatWords).length;
  const rightAnswersPercentAllTime = Math.round(rightAnswersAllTime / (cardsShowedAllTime + DELTA));
  const now = new Date(Date.now());
  const receiptDate = new Date(dateOfReceiptOfWords);
  const hoursToReceiptWords = new Date(now - receiptDate);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="md">
          <Typography gutterBottom align="center" variant="h6">
            {`Всего  показано новых слов -- ${differentCardsShowedAllTime}!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Выучено ${
              differentCardsShowedAllTime - learnedWordsAllTime
            } слов из 3600, правильных ответов -- ${rightAnswersPercentAllTime}%!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            Сегодняшний прогресс:
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Осталось изучить новых слов сегодня -- ${leftNewWordsToday}!
            Осталось слов на повторение сегодня -- ${leftRepeatWordsToday}!`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Всего сегодня было показано ${cardsShowedToday} карточек!
            Правильных ответов сегодня -- ${rightTodayAnswers} или ${
              rightTodayAnswers / (cardsShowedToday + DELTA)
            }%`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Самая длинная серия правильных ответов сегодня -- ${longestTodaySeries}`}
          </Typography>
          <Typography gutterBottom align="center" variant="h6">
            {`Карточки с новыми словами прибудут в течение ${hoursToReceiptWords.getHours()} часов!`}
          </Typography>
        </Container>
        <ChartSplineArea
          title="Процент отгаданных карточек за каждый из 15 последних дней"
          data={dataChartRightAnswersPercent15Days}
          valueField="cards"
          argumentField="day"
          name="name4"
        />
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Выучено слов за каждый из 15 последних дней"
            data={dataChartlearnedWords15Days}
            valueField="cards"
            argumentField="day"
            name="name1"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Показано карточек всего за каждый из 15 последних дней"
            data={dataChartCardsShowed15Days}
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
            data={dataChartrightAnswers15Days}
            valueField="cards"
            argumentField="day"
            name="name2"
          />
        </Container>
        <Container maxWidth="sm">
          <ChartSplineArea
            title="Показано новых карточек за каждый из 15 последних дней"
            data={dataChartNewCardsShowed15Days}
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
};

export default StatisticPage;
