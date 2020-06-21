import setCookie from './setCookie';

const deleteCookie = (name) => {
  setCookie(name, '', { 'max-age': -1 });
};

export default deleteCookie;
