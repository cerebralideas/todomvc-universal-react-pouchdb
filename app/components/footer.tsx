import * as React from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/todo-filters';

let FILTER_TITLES = {
	[SHOW_ALL]: 'All',
	[SHOW_ACTIVE]: 'Active',
	[SHOW_COMPLETED]: 'Completed'
};

interface Props {
	completedCount?: number;
	activeCount?: number;
	filter?: string;
	onClearCompleted?: Function;
	onShow?: Function;
}

function Footer(props: Props) {

	function renderTodoCount() {
		let {activeCount} = props;
		let itemWord = activeCount === 1 ? 'item' : 'items';

		return (
			<span className="todo-count">
				<strong>{activeCount || 'No'}</strong> {itemWord} left
			</span>
		);
	}

	function renderFilterLink(filter) {
		let title = FILTER_TITLES[filter];
		let { filter: selectedFilter } = props;
		let isSelected =  filter === selectedFilter ? 'selected' : '';

		return (
			<a className={isSelected}
			   href={filter}
			   style={{ cursor: 'pointer' }}>
				{title}
			</a>
		);
	}

	function renderClearButton() {
		let { completedCount, onClearCompleted } = props;
		if (completedCount > 0) {
			return (
				<button className="clear-completed"
						onClick={ () => onClearCompleted() }>
					Clear completed
				</button>
			);
		}
	}

	return (
		<footer className="footer">
			{ renderTodoCount() }
			<ul className="filters">
				{[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
					<li key={filter}>
						{renderFilterLink(filter)}
					</li>
				)}
			</ul>
			{ renderClearButton() }
		</footer>
	);
}

export default Footer;
