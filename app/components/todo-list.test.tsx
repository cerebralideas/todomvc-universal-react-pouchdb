import React from 'react';
import { createStore } from 'redux';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import reactSetup from '../../utilities/react-test-setup';
import rootReducer from '../reducers';
import TodoList from './todo-list';

//@ts-ignore
configure({ adapter: new Adapter() });

test('Test todo list rendering', function () {
	let state = {
			todos: [
				{
					id: 0,
					title: 'An existing todo',
					completed: false,
					editing: false
				},
				{
					id: 1,
					title: 'Another existing todo',
					completed: false,
					editing: false
				}
			],
			filter: 'show_all'
		},
		store = createStore(rootReducer, state),
		el = mount(
			<Provider store={ store }>
				<TodoList />
			</Provider>
		);
	expect(el.find('.todoItem').length).toBe(2);
});
