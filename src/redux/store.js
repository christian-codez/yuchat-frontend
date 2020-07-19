import { createStore, applyMiddleware, compose } from 'redux';
import { combinedReducers } from './reducers/index';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

const middlewares = [thunk];
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  combinedReducers,
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(...middlewares), devTools)
    : compose(applyMiddleware(...middlewares))
);

// export const store = createStore(
//   combinedReducers,
//   process.env.NODE_ENV === 'development'
//     ? compose(applyMiddleware(...middlewares))
//     : compose(applyMiddleware(...middlewares))
// );

export const persistor = persistStore(store);
