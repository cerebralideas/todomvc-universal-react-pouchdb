import * as React from 'react';
import TodoTextInput from './TodoTextInput';

interface Props {
	addTodo?: Function;
	filter?: string;
}

function Header(props: Props) {
	let newTodo = true;
	let fakeTodo = {
		editing: false,
		title: ''
	};

	return (
		<header className="header">
			<h1>todos</h1>
			<TodoTextInput todo={ fakeTodo }
						   newTodo={ newTodo }
						   filter={props.filter}
						   placeholder="What needs to be done?" />
		</header>
	);
}

export default Header;
