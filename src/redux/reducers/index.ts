import { combineReducers } from 'redux';
// import testReducer         from './testReducer';
import repositoriesReducer from './repositoriesReducer';




const rootReducer = combineReducers({
  // testReducer: testReducer,
  repositoriesReducer: repositoriesReducer
});

export default rootReducer;


export type RootState = ReturnType<typeof rootReducer>;
