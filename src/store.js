import _ from 'lodash';
import createBrowserHistory from 'history/createBrowserHistory';
import jsonpack from 'jsonpack';
import persistState from 'redux-localstorage';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReduxLocationActions, listenForHistoryChange } from 'redux-location-state';

import rootReducer from './reducers';

const REDUX_LOCALSTORAGE_PATHS = [
  'form.preferences.values',
  'form.settings.values',
  'savedItems',
];
const REDUX_LOCALSTORAGE_CONFIG = {
  key: 'elasticsearch-analysis-inspector/preferences',
  merge: (initialState, persistedState) => _.merge({}, initialState, persistedState),
  slicer: paths => state => {
    const persistedState = {};
    paths.forEach(path => {
      const stateVal = _.get(state, path);
      _.set(persistedState, path, stateVal);
    });
    return persistedState;
  },
};

const history = createBrowserHistory();

const paramSetup = { global: {} };
const mapLocationToState = (state, location) => {
  const compressedStateFromLocationQuery = _.isString(location.search) && (new URLSearchParams(location.search.substring(1))).get('q');
  return compressedStateFromLocationQuery
    ? _.merge({}, state, decompress(compressedStateFromLocationQuery))
    : state;
};
const overwriteLocationHandling = (initialState, nextState, location) => {
  const OMITTED_STATE_PROPS = ['flyoutReducer', 'form', 'savedItems'];
  return {
    location: _.assign({}, location, {
      search: `?q=${compress(_.omit(nextState, OMITTED_STATE_PROPS))}`,
      shouldPush: true,
    }),
  };
};

const { locationMiddleware, reducersWithLocation } = createReduxLocationActions(paramSetup, mapLocationToState, history, rootReducer, overwriteLocationHandling);

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware, locationMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, persistState(REDUX_LOCALSTORAGE_PATHS, REDUX_LOCALSTORAGE_CONFIG)];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducersWithLocation, preloadedState, composedEnhancers);
  if(process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  listenForHistoryChange(store, history);

  return store;
}

function compress(state) {
  return encodeURIComponent(jsonpack.pack(state));
}

function decompress(compressedState) {
  return jsonpack.unpack(decodeURIComponent(compressedState));
}
