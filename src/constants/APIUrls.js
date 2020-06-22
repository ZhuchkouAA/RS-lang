const API_URLS = {
  GET_WORDS: 'https://afternoon-falls-25894.herokuapp.com/words',
  GET_WORDS_COUNT: 'https://afternoon-falls-25894.herokuapp.com/words/count',
  GET_WORD_BY_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/words/${id}`,
  USERS_CREATE_USER: 'https://afternoon-falls-25894.herokuapp.com/users',
  USERS_BY_USER_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
  USER_WORDS_BY_USER_ID: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/words`,
  USER_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
  USER_AGGREGATED_WORDS_BY_USER_ID: (id) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords`,
  USER_AGGREGATED_WORDS_BY_USER_ID_WORD_ID: (id, wordId) =>
    `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords${wordId}`,
  USER_STATISTICS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
  USER_SETTINGS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://afternoon-falls-25894.herokuapp.com/signin',
};

export default API_URLS;
