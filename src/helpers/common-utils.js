import PATH from '../constants/path';
import SECTION from '../constants/section';

const getGameInfo = () => {
  const games = SECTION.slice(1);

  return games.map(({ section, ...game }) => {
    return { path: PATH[section], ...game };
  });
};

export default getGameInfo;
