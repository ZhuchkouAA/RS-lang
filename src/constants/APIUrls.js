const API_URLS = {
  GET_WORDS: (group, page, wordsPerExampleSentenceLTE, wordsPerPage) =>
    `https://pacific-castle-12388.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`,
  GET_WORDS_COUNT: 'https://pacific-castle-12388.herokuapp.com/words/count',
  GET_WORD_BY_ID: (id) => `https://pacific-castle-12388.herokuapp.com/words/${id}`,
  USERS_CREATE_USER: 'https://pacific-castle-12388.herokuapp.com/users',
  USERS_BY_USER_ID: (id) => `https://pacific-castle-12388.herokuapp.com/users/${id}`,
  USER_WORDS_BY_USER_ID: (id) => `https://pacific-castle-12388.herokuapp.com/users/${id}/words`,
  USER_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
<<<<<<< HEAD
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
  USER_AGGREGATED_WORDS_BY_USER_ID: (id, group) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords?group=${group}&wordsPerPage=600`,
=======
    `https://pacific-castle-12388.herokuapp.com/users/${id}/words/${wordId}`,
  USER_AGGREGATED_WORDS_BY_USER_ID: (id, group) =>
    `https://pacific-castle-12388.herokuapp.com/users/${id}/aggregatedWords?group=${group}&wordsPerPage=600`,
>>>>>>> RSL-30: add game mode reducer, refactor routes, connection sprint game to start game page
  USER_AGGREGATED_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
    `https://pacific-castle-12388.herokuapp.com/users/${id}/aggregatedWords${wordId}`,
  USER_STATISTICS: (id) => `https://pacific-castle-12388.herokuapp.com/users/${id}/statistics`,
  USER_SETTINGS: (id) => `https://pacific-castle-12388.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://pacific-castle-12388.herokuapp.com/signin',
  ASSETS: 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/',
};

export default API_URLS;
