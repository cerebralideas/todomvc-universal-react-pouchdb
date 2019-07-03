import * as React from 'react';
import { connect } from 'react-redux';
import TodoTextInput from './todo-text-input';

function Header(props: { filter: string }) {
	let newTodo = true,
		fakeTodo = {
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


export default connect((state: { filter: string }) => ({ filter: state.filter }))(Header);
