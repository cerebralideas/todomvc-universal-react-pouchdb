import * as React from 'react';
import { connect } from 'react-redux';
import TodoItem from './todo-item';
import ToggleAll from './toggle-all';
import Footer from './footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todo-filters';

import { State as Todo } from '../reducers/todos';

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: (todo) => !todo.completed,
	[SHOW_COMPLETED]: (todo) => todo.completed
};

interface Props {
	todos?: Todo[];
	filter?: string;
}

function TodoList({ todos, filter }: Props) {
	let filteredTodos = todos.filter(TODO_FILTERS[filter]);

	return (
		<section className="main">
			<ToggleAll />
			<ul className="todo-list">
				{filteredTodos.map(todo =>
					<TodoItem key={ todo.id } todo={ todo } filter={ filter } />
				)}
			</ul>
			<Footer />
		</section>
	);
}

export default connect((state) => state)(TodoList);
