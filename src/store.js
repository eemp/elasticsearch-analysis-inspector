import _ from 'lodash';
import createBrowserHistory from 'history/createBrowserHistory';
import jsonpack from 'jsonpack';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReduxLocationActions, listenForHistoryChange } from 'redux-location-state';

import rootReducer from './reducers';

const history = createBrowserHistory();

const paramSetup = { global: {} };
const mapLocationToState = (state, location) => {
  const compressedStateFromLocationQuery = _.isString(location.search) && (new URLSearchParams(location.search.substring(1))).get('q');
  return compressedStateFromLocationQuery
    ? decompress(compressedStateFromLocationQuery)
    : state;
};
const overwriteLocationHandling = (initialState, nextState, location) => {
  const OMITTED_STATE_PROPS = ['flyoutReducer'];
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

  const enhancers = [middlewareEnhancer];
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
