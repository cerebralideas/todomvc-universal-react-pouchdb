import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import TodoList from '../components/todo-list';

interface Props {
	todos: any;
	filter: string;
}

function App(props: Props) {

	let { todos, filter } = props;
	return (
		<div>
			<Header filter={filter} />
			<TodoList todos={todos} filter={filter} />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		todos: state.todos,
		filter: state.filter
	};
}

export default connect(
	mapStateToProps
)(App);
