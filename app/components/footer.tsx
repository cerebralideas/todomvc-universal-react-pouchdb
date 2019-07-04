import React from 'react';
import { connect } from 'react-redux';
import { completeAll, clearCompleted } from '../events/client-events';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todo-filters';

import { State } from '../interfaces';

let FILTER_TITLES = {
	[SHOW_ALL]: 'All',
	[SHOW_ACTIVE]: 'Active',
	[SHOW_COMPLETED]: 'Completed'
};

interface Props {
	completed?: number;
	count?: number;
	filter?: string;
	active?: number;
}

function Footer({ filter, count, completed, active }: Props) {

	if (count) {
		function RenderTodoCount() {
			let itemWord = active === 1 ? 'item' : 'items';

			return (
				<span className="todo-count">
					<strong>{ active || 'No' }</strong> { itemWord } left
				</span>
			);
		}

		function RenderFilterLink({ filterType }) {
			let title = FILTER_TITLES[filterType];
			let isSelected = filter === filterType ? 'selected' : '';

			return (
				<a className={ isSelected }
					href={ filterType }
					style={{ cursor: 'pointer' }}>
						{ title }
				</a>
			);
		}

		function RenderClearButton() {
			if (completed > 0) {
				return (
					<button className="clear-completed"
							onClick={ () => clearCompleted() }>
						Clear completed
					</button>
				);
			} else {
				return null;
			}
		}

		return (
			<footer className="footer">
				<RenderTodoCount />
				<ul className="filters">
					{[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map((filterType) =>
						<li key={filterType}>
							<RenderFilterLink filterType={ filterType } />
						</li>
					)}
				</ul>
				<RenderClearButton />
			</footer>
		);
	} else {
		return null;
	}
}

export default connect(({ filter, todos }: State) => {
	let count = todos.length,
		completed = todos.reduce((count, todo) => (
				todo.completed ? count + 1 : count
			),
			0
		),
		active = count - completed;

	return {
		filter,
		count,
		completed,
		active
	};
})(Footer)
