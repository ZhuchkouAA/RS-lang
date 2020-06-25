const deleteWithTokenRequest = (url, token) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default deleteWithTokenRequest;
