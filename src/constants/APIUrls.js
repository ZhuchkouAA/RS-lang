const API_URLS = {
  USERS_CREATE_USER: 'https://afternoon-falls-25894.herokuapp.com/users',
  USER_SETTINGS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://afternoon-falls-25894.herokuapp.com/signin',
  ASSETS: 'https://raw.githubusercontent.com/zhuchkouaa/rslang-data/master/',
};

export default API_URLS;
