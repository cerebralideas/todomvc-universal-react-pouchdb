import * as React from 'react';
import { Component, PropTypes } from 'react';
import * as classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

if (typeof window === 'object') {
	classnames = classnames.default;
}

interface Props {
	todo?: any;
	editTodo?: Function;
	deleteTodo?: Function;
	completeTodo?: Function;
	filter: string;
}
interface State {
	editing?: boolean;
}

class TodoItem extends Component<Props, State> {
	static propTypes = {
		todo: PropTypes.object.isRequired,
		editTodo: PropTypes.func.isRequired,
		deleteTodo: PropTypes.func.isRequired,
		completeTodo: PropTypes.func.isRequired,
		filter: PropTypes.string.isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			editing: false
		}
	}

	handleDoubleClick() {
		this.setState({editing: true});
	}

	handleSave(id, text) {
		if (text.length === 0) {
			this.props.deleteTodo(id);
		} else {
			this.props.editTodo(id, text);
		}
		this.setState({editing: false});
	}

	render() {
		const {todo, completeTodo, deleteTodo, filter } = this.props;
		
		let element;
		if (this.state.editing) {
			element = (
				<TodoTextInput text={ todo.text }
							   filter={ filter }
							   editing={ this.state.editing }
							   onSave={ (text) => this.handleSave(todo.id, text) }/>
			);
		} else {
			element = (
				<div className="view">
					<input className="toggle"
						   type="checkbox"
						   checked={todo.completed}
						   onChange={() => completeTodo(todo.id)}/>
					<label onDoubleClick={ this.handleDoubleClick.bind(this) }>
						{todo.text}
					</label>
					<button className="destroy"
							onClick={ () => deleteTodo(todo.id) }/>
				</div>
			);
		}

		return (
			<li className={ classnames({
				completed: todo.completed,
				editing: this.state.editing
			})}>
				{element}
			</li>
		);
	}
}

export default TodoItem;
