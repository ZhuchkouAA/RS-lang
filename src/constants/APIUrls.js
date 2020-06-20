const API_URLS = {
  WORDS: {
    getWords: 'https://afternoon-falls-25894.herokuapp.com/words',
    getWordsCount: 'https://afternoon-falls-25894.herokuapp.com/words/count',
    getWordById: (id) => `https://afternoon-falls-25894.herokuapp.com/words/${id}`,
  },
  USERS: {
    createUser: 'https://afternoon-falls-25894.herokuapp.com/users',
    byUserId: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
  },
  USER_WORDS: {
    byUserId: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/words`,
    byUserIdAndWordId: (id, wordId) =>
      `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
  },
  USER_AGGREGATED_WORDS: {
    byUserId: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords`,
    byUserIdAndWordId: (id, wordId) =>
      `https://afternoon-falls-25894.herokuapp.com/users/${id}/aggregatedWords${wordId}`,
  },
  USER_STATISTICS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
  USER_SETTINGS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://afternoon-falls-25894.herokuapp.com/signin',
};

export default API_URLS;
