import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import client from 'react-engine/lib/client';
import App from './views/app';
import { configureStore } from './store/redux-store';
import routes from './routes/client-routes';

//@ts-ignore
console.log(WEBPACK_ENV);
//@ts-ignore
if (WEBPACK_ENV !== 'production') {
	let axe = require('react-axe');
	axe(React, ReactDOM);
}

document.addEventListener("DOMContentLoaded", () => {

	var serverState = client.data();
	let store = configureStore({
		todos: serverState.todos,
		filter: serverState.filter
	});

	store.subscribe(() => { console.log(store.getState()) });

	routes(store);

	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
});
