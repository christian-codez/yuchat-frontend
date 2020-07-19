import { combineReducers } from 'redux';
import appReducer from './app';
import chatReducer from './chat';
import apiRequestReducer from './api-requests';
import authReducer from './auth';
import callReducer from './call';
import reactionReducer from './reaction';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['app', 'auth', 'chat', 'api'],
  // whitelist: [],
};

export const combinedReducers = persistReducer(
  persistConfig,
  combineReducers({
    app: appReducer,
    chat: chatReducer,
    api: apiRequestReducer,
    auth: authReducer,
    call: callReducer,
    reaction: reactionReducer,
  })
);
