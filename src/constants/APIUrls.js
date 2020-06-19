const API_URLS = {
  words: {
    getWords: 'https://afternoon-falls-25894.herokuapp.com/words',
    getWordsCount: 'https://afternoon-falls-25894.herokuapp.com/words/count',
    getWordById: (id) => `https://afternoon-falls-25894.herokuapp.com/words/${id}`,
  },
  users: {
    createUser: 'https://afternoon-falls-25894.herokuapp.com/users',
    getUserById: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
    updateUserById: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
    deleteUserById: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}`,
  },
  userWords: {
    getAllUserWords: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/words`,
    createUserWord: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/words`,
    getUserWord: (id, wordId) =>
      `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
    updateUserWord: (id, wordId) =>
      `https://afternoon-falls-2589
     4.herokuapp.com/users/${id}/words/${wordId}`,
    deleteUserWord: (id, wordId) =>
      `https://afternoon-falls-25894.herokuapp.com/users/${id}/words/${wordId}`,
  },
  userStatistics: {
    getStatistics: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
    putStatistics: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/statistics`,
  },
  userSettings: {
    getSettings: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
    putSettings: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  },
  signIn: 'https://afternoon-falls-25894.herokuapp.com/signin',
};

export default API_URLS;
