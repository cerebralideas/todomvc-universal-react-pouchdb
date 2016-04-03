import * as React from 'react';
import { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: todo => !todo.completed,
	[SHOW_COMPLETED]: todo => todo.completed
};

interface Props {
	todos?: Array<any>;
	filter?: string;
	actions?: {
		clearCompleted?: Function,
		completeAll?: Function
	};
}

class MainSection extends Component<Props, {}> {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		filter: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired
	};

	constructor(props, context) {
		super(props, context);
	}

	handleClearCompleted() {
		this.props.actions.clearCompleted()
	}

	renderToggleAll(completedCount) {
		const {todos, actions} = this.props;
		if (todos.length > 0) {
			return (
				<input className="toggle-all"
					   type="checkbox"
					   checked={ completedCount === todos.length }
					   onChange={ actions.completeAll }/>
			);
		}
	}

	renderFooter(completedCount) {
		const { todos, filter } = this.props;
		const activeCount = todos.length - completedCount;

		if (todos.length) {
			return (
				<Footer completedCount={ completedCount }
						activeCount={ activeCount }
						filter={ filter }
						onClearCompleted={ this.handleClearCompleted.bind(this) }/>
			);
		}
	}

	render() {
		const { todos, actions, filter } = this.props;
		const filteredTodos = todos.filter(TODO_FILTERS[filter]);
		const completedCount = todos.reduce((count, todo) =>
				todo.completed ? count + 1 : count,
				0
		);

		return (
			<section className="main">
				{this.renderToggleAll(completedCount)}
				<ul className="todo-list">
					{filteredTodos.map(todo =>
						<TodoItem key={ todo.id } todo={ todo } { ...actions } />
					)}
				</ul>
				{this.renderFooter(completedCount)}
			</section>
		);
	}
}

export default MainSection;
