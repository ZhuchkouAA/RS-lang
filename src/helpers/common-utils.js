import { GAMES } from '../constants/section';

const getGameInfo = () => {
  const games = GAMES.slice(1);

  return games.map(({ section, ...game }) => {
    return { path: GAMES.path, ...game };
  });
};

export default getGameInfo;
