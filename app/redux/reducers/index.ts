import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import mainReducer from './mainReducer';

const storage = AsyncStorage;

const mainPersistConfig = {
  key: 'main',
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default () => rootReducer;
