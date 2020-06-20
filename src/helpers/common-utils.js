import PATH from '../constants/path';
import { GAMES } from '../constants/section';

const getGameInfo = () => {
  const games = GAMES.slice(1);

  return games.map(({ section, ...game }) => {
    return { path: PATH[section], ...game };
  });
};

export default getGameInfo;
