/// <reference path="./definitions/tsd.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import page from 'page';

declare var __REACT_ENGINE__: any;

let serverState =  __REACT_ENGINE__;
const store = configureStore({ todos: serverState.todos, filter: serverState.filter });

page('/', function () {
	store.dispatch({ type: 'SHOW_ALL' })
});
page('/show_all', function () {
	store.dispatch({ type: 'SHOW_ALL' })
});
page('/show_active', function () {
	store.dispatch({ type: 'SHOW_ACTIVE' })
});
page('/show_completed', function () {
	store.dispatch({ type: 'SHOW_COMPLETED' })
});
page();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
