import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import channelsReducer from './reducers/channels.reducer';
import authReducer from './reducers/auth.reducer';

const reducer = combineReducers({
  channelState: channelsReducer,
  authState: authReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export type AppDispatch = typeof store.dispatch;
export type AppUseStoreType = typeof store
export type RootState = ReturnType<typeof reducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;