import { INCREMENT_COUNT } from './types';


export const incrementCount = () => {
  return { type: INCREMENT_COUNT, payload: 1 };
};
