import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers';
import Api from './utils/Api';

/* eslint-disable no-underscore-dangle */

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware.withExtraArgument({ Api })),
);

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunkMiddleware.withExtraArgument({ Api })),
//   logger,
// );

export default store;
