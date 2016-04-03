/// <reference path="../definitions/classnames/classnames.d.ts" />

import * as React from 'react';
import { PropTypes, Component } from 'react';
import * as classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

if (typeof window === 'object') {
	classnames = classnames.default;
}

const FILTER_TITLES = {
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
interface State {}

class Footer extends Component<Props, State> {
	static propTypes = {
		completedCount: PropTypes.number.isRequired,
		activeCount: PropTypes.number.isRequired,
		filter: PropTypes.string.isRequired,
		onClearCompleted: PropTypes.func.isRequired
	};

	renderTodoCount() {
		const {activeCount} = this.props;
		const itemWord = activeCount === 1 ? 'item' : 'items';

		return (
			<span className="todo-count">
				<strong>{activeCount || 'No'}</strong> {itemWord} left
			</span>
		);
	}

	renderFilterLink(filter) {
		const title = FILTER_TITLES[filter];
		const { filter: selectedFilter } = this.props;

		return (
			<a className={classnames({ selected: filter === selectedFilter })}
			   href={filter}
			   style={{ cursor: 'pointer' }}>
				{title}
			</a>
		);
	}

	renderClearButton() {
		const {completedCount, onClearCompleted} = this.props;
		if (completedCount > 0) {
			return (
				<button className="clear-completed"
						onClick={onClearCompleted}>
					Clear completed
				</button>
			);
		}
	}

	render() {
		return (
			<footer className="footer">
				{this.renderTodoCount()}
				<ul className="filters">
					{[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
					<li key={filter}>
						{this.renderFilterLink(filter)}
					</li>
						)}
				</ul>
				{this.renderClearButton()}
			</footer>
		);
	}
}

export default Footer;
