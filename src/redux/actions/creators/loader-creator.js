import { RUN_LOADER, STOP_LOADER } from '../types/action-types';

export const runLoader = () => ({
  type: RUN_LOADER,
});

export const stopLoader = () => ({
  type: STOP_LOADER,
});
