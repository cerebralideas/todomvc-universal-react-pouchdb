import { createStore } from 'redux';
import rootReducer from '../reducers';

export let store;

export function configureStore(initialState): any {
	if (!store) {
		store = createStore(rootReducer, initialState);
	}
	return store;
}
