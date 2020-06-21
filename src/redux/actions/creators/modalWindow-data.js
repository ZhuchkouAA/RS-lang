import { SHOW_MESSAGE, HIDE_MESSAGE } from '../types/action-types';

export const showMessage = (message) => ({
  type: SHOW_MESSAGE,
  payload: message,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});
