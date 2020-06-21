const initValueOptions = {
  path: '/',
  'max-aga': 14400,
  samesite: 'lax',
};

const setCookie = (name, value, options = initValueOptions) => {
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  const keys = Object.keys(options);
  keys.forEach((key) => {
    updatedCookie += `; + ${key}`;
    updatedCookie += options[key] ? `=${options[key]}` : '';
  });

  document.cookie = updatedCookie;
};

export default setCookie;
