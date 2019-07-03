import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as client from 'react-engine/lib/client';
import App from './views/app';
import { configureStore } from './store/redux-store';
import routes from './routes/client-routes';

document.addEventListener("DOMContentLoaded", () => {

	var serverState = client.data();
	let store = configureStore({
		todos: serverState.todos,
		filter: serverState.filter
	});

	store.subscribe(() => { console.log(store.getState()) });

	routes(store);

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	);
});
