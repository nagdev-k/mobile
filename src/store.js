import { createStore, compose, applyMiddleware } from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/hardSet';

import rootReducer from './state';

const enhancer = compose(
  applyMiddleware(thunk),
  devTools({
    name: 'chatapp',
    realtime: true,
  }),
);

const persistConfig = {
  timeout: 10000,
  key: 'version1',
  storage,
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store, null, () => {
  store.dispatch({ type: 'SYNCED' });
});

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./state', () => {
    const nextRootReducer = require('./state').default;
    store.replaceReducer(nextRootReducer);
  });
}
export default store;
