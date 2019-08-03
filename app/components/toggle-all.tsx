import React from 'react';
import { connect } from 'react-redux';
import { completeAll } from '../events/client-events';

import { State } from '../interfaces';

interface Props {
	count: number;
	completed: number;
}

function ToggleAll({ count, completed }: Props) {
	if (count > 0) {
		return (
			<>
				<input id="toggle-all"
						className="toggle-all"
						type="checkbox"
						checked={ completed === count }
						onChange={ completeAll }/>
				<label htmlFor="toggle-all" />
			</>
		);
	} else {
		return null;
	}
}

export default connect(({ todos }: State) => ({
	count: todos.length,
	completed: todos.reduce((count, todo) => (
			todo.completed ? count + 1 : count
		),
		0
	)
}))(ToggleAll)
