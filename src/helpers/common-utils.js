import PATH from '../constants/path';
import section from '../constants/section';

const getGameInfo = () => {
  const games = Object.values(section).slice(1);
  const { SPEAK_IT, ENGLISH_PUZZLE, SAVANNA, AUDIO_CALL, SPRINT, OWN_GAME } = PATH;
  const gamePaths = [SPEAK_IT, ENGLISH_PUZZLE, SAVANNA, AUDIO_CALL, SPRINT, OWN_GAME];

  return games.map((game, index) => {
    return { path: gamePaths[index], ...game };
  });
};

export default getGameInfo;
