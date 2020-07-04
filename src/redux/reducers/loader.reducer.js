import { RUN_LOADER, STOP_LOADER } from '../actions/types/action-types';

const initiaLoaderState = {
  isLoading: false,
};

const loaderReducer = (state = initiaLoaderState, { type }) => {
  switch (type) {
    case RUN_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;
