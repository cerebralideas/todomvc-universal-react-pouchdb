import { createStore } from 'redux';
import rootReducer from '../reducers/index';

export let store;

export function configureStore(initialState) {
	if (!store) {
		store = createStore(rootReducer, initialState);
	}
	return store;
}
