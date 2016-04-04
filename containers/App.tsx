import * as React from 'react';
import { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/index';

interface Props {
	todos: any;
	filter: string;
	actions: {
		addTodo: any,
		deleteTodo: any,
		editTodo: any,
		completeTodo: any,
		completeAll: any,
		clearCompleted: any,
		showAll: any,
		showActive: any,
		showCompleted: any
	};
} 

class App extends Component<Props, {}> {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		filter: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired
	};

	render() {
		const { todos, actions, filter } = this.props;
		return (
			<div>
				<Header addTodo={actions.addTodo} filter={filter} />
				<MainSection todos={todos} filter={filter} actions={actions}/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		todos: state.todos,
		filter: state.filter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TodoActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
