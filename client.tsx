/// <reference path="./definitions/tsd.d.ts" />

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import routes from './initiators/client-routes';

declare var __REACT_ENGINE__: any;

let serverState =  __REACT_ENGINE__;
const store = configureStore({
	todos: serverState.todos,
	filter: serverState.filter
});

routes(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
