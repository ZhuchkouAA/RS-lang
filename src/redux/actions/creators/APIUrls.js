const API_URLS = {
  USERS_CREATE_USER: 'https://afternoon-falls-25894.herokuapp.com/users',
  USER_SETTINGS: (id) => `https://afternoon-falls-25894.herokuapp.com/users/${id}/settings`,
  SIGN_IN: 'https://afternoon-falls-25894.herokuapp.com/signin',
};

export default API_URLS;
