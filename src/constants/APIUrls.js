const API_URLS = {
  GET_WORDS: (group, page, wordsPerExampleSentenceLTE, wordsPerPage) =>
    `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`,
  GET_WORDS_COUNT: 'https://afternoon-falls-25894.herokuapp.com/words/count',
  GET_WORD_BY_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/words/${id}`,
  USERS_CREATE_USER: 'https://afternoon-falls-25894.herokuapp.com/users',
  USERS_BY_USER_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
  USER_WORDS_BY_USER_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/words`,
  USER_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
  USER_AGGREGATED_WORDS_BY_USER_ID: (id, group) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords?group=${group}&wordsPerPage=600`,
  USER_AGGREGATED_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords${wordId}`,
  USER_STATISTICS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
  USER_SETTINGS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://afternoon-falls-25894.herokuapp.com/signin',
  ASSETS: 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/',
  PROM_VIDEO: 'https://www.youtube.com/embed/UlrIvJFw4sU',
  REPOSITORY: 'https://github.com/ZhuchkouAA/RS-lang',
};

export default API_URLS;
