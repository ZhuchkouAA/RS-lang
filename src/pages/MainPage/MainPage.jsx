import React from 'react';
import { Grid, Container, Box, Divider } from '@material-ui/core';

import AppSectionCard from '../../components/AppSectionCard';
import UserProgressCard from '../../components/UserProgressCard';
import PATH from '../../constants/path';
import section from '../../constants/section';
import getGameInfo from '../../helpers/common-utils';

const MainPage = () => {
  const { wordCard } = section;
  const gemaInfo = getGameInfo();

  const gamesCards = gemaInfo.map((game) => {
    const { path, name, description } = game;

    return (
      <Box m={1} key={name}>
        <AppSectionCard path={path} name={name} description={description} />
      </Box>
    );
  });

  return (
    <Container maxWidth="sm">
      <Grid container justify="space-around" mb={4} spacing={2}>
        <Box mb={2}>
          <AppSectionCard
            path={PATH.WORD_CARD}
            name={wordCard.name}
            description={wordCard.description}
          />
        </Box>
        <Box mb={2}>
          <UserProgressCard />
        </Box>
      </Grid>

      <Divider />
      <Box m={2}>
        <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
          {gamesCards}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;
