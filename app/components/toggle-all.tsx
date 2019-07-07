import React from 'react';
import { connect } from 'react-redux';
import { completeAll } from '../events/client-events';

import { State } from '../interfaces';

interface Props {
	count: number;
	completed: number;
}
function ToggleAll(props: Props) {
	if (props.count > 0) {
		return (
			<>
				<input id="toggle-all"
						className="toggle-all"
						type="checkbox"
						checked={ props.completed === props.count }
						onChange={ completeAll }/>
				<label htmlFor="toggle-all" />
			</>
		);
	} else {
		return null;
	}
}

export default connect((state: State) => ({
	count: state.todos.length,
	completed: state.todos.reduce((count, todo) => (
			todo.completed ? count + 1 : count
		),
		0
	)
}))(ToggleAll)
