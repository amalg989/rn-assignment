import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';
import 'regenerator-runtime/runtime';
import createRootReducers from '../reducers';
import assignmentSaga from '../saga/mainSaga';

const sagaMiddleware = createSagaMiddleware();

export default (preloadState: any = {}): any => {
  const store = createStore(
    createRootReducers(),
    preloadState,
    applyMiddleware(sagaMiddleware),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(assignmentSaga);
  return {store, persistor};
};
