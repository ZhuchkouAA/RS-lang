const postWithTokenRequest = (url, token, body) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });
};

export default postWithTokenRequest;
