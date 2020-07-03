import { APPLY_SETTINGS, RESET_SETTINGS } from '../types/action-types';

export const applySettings = (settings) => ({
  type: APPLY_SETTINGS,
  payload: { ...settings },
});

export const resetSettings = () => ({
  type: RESET_SETTINGS,
});
