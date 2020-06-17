import { setToken } from '../../redux/actions/creators/sign-in-data';

export default function signIn(login, password) {
  return (dispatch) => {
    fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login, password }),
    })
      .then((response) => response.json())
      .then((content) => {
        dispatch(setToken(content.token));
      })
      .catch((error) => console.log(error));
  };
}
