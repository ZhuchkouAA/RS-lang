import { TOKEN, USER_ID } from '../constants/cookiesNames';

const initValueOptions = {
  path: '/',
  'max-age': 14400,
  samesite: 'lax',
};

export const setCookie = (name, value, options = initValueOptions) => {
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const keys = Object.keys(options);
  keys.forEach((key) => {
    updatedCookie += `; ${key}`;
    updatedCookie += options[key] ? `=${options[key]}` : '';
  });
  document.cookie = updatedCookie;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );

  return matches ? decodeURIComponent(matches[1]) : null;
};

export const deleteCookie = (name) => {
  setCookie(name, '', { 'max-age': -1 });
};

export const clearAllCookie = () => {
  deleteCookie(TOKEN);
  deleteCookie(USER_ID);
};
