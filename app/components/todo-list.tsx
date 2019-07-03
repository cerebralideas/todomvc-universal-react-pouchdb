import * as React from 'react';
import TodoItem from './todo-item';
import Footer from './footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todo-filters';
import { completeAll, clearCompleted } from '../events/client-events';

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: todo => !todo.completed,
	[SHOW_COMPLETED]: todo => todo.completed
};

interface Props {
	todos?: Array<any>;
	filter?: string;
}

function MainSection(props: Props) {

	let { todos, filter } = props;
	let filteredTodos = todos.filter(TODO_FILTERS[filter]);
	let completedCount = todos.reduce((count, todo) =>
			todo.completed ? count + 1 : count,
			0
		);

	function renderToggleAll(completedCount) {
		if (todos.length > 0) {
			return (
				<input className="toggle-all"
					   type="checkbox"
					   checked={ completedCount === todos.length }
					   onChange={ completeAll }/>
			);
		}
	}

	function renderFooter(completedCount) {
		let activeCount = todos.length - completedCount;

		if (todos.length) {
			return (
				<Footer completedCount={ completedCount }
						activeCount={ activeCount }
						filter={ filter }
						onClearCompleted={ clearCompleted }/>
			);
		}
	}

	return (
		<section className="main">
			{ renderToggleAll(completedCount) }
			<ul className="todo-list">
				{filteredTodos.map(todo =>
					<TodoItem key={ todo.id } todo={ todo } filter={ filter } />
				)}
			</ul>
			{ renderFooter(completedCount) }
		</section>
	);
}

export default MainSection;
