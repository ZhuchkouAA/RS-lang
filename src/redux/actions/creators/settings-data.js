import { APPLY_SETTINGS, INIT_SETTINGS } from '../types/action-types';

export const applySettings = (settings) => ({
  type: APPLY_SETTINGS,
  payload: { ...settings },
});

export const initSettings = () => ({
  type: INIT_SETTINGS,
});
