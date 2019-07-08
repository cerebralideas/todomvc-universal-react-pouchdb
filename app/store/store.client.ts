import { createStore, Store } from 'redux';
import rootReducer from '../reducers';

export let store;

export function configureStore(initialState): Store {
	if (!store) {
		store = createStore(rootReducer, initialState);
	}
	return store;
}
