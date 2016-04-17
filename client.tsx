/// <reference path="./definitions/tsd.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/redux-store';
import routes from './initiators/client-routes';
import { initStore } from './initiators/client-events';

declare var __REACT_ENGINE__: any;

let serverState =  __REACT_ENGINE__;
let store = configureStore({
	todos: serverState.todos,
	filter: serverState.filter
});

store.subscribe(function () { console.log(store.getState()) });

routes(store);
initStore(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
