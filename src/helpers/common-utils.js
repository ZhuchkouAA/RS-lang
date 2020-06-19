import PATH from '../constants/path';
import section from '../constants/section';

const getGameInfo = () => {
  const games = Object.values(section).slice(1);
  const { ENGLISH_PUZZLE, SPRINT, SAVANNA, AUDIO_CALL, SPEAK_IT, OWN_GAME } = PATH;
  const gamePaths = [ENGLISH_PUZZLE, SPRINT, SAVANNA, AUDIO_CALL, SPEAK_IT, OWN_GAME];

  return games.map((game, index) => {
    return { path: gamePaths[index], ...game };
  });
};

export default getGameInfo;
