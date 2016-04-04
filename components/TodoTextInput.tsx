import * as React from 'react';
import { Component, PropTypes } from 'react';
import events from '../initiators/client-events';

interface Props {
	onSave?: Function;
	text?: string;
	placeholder?: string;
	editing?: boolean;
	newTodo?: boolean;
	filter?: string;
}
interface State {
	text?: string;
}

class TodoTextInput extends Component<Props, State> {
	static propTypes = {
		onSave: PropTypes.func.isRequired,
		text: PropTypes.string,
		placeholder: PropTypes.string,
		editing: PropTypes.bool,
		newTodo: PropTypes.bool,
		filter: PropTypes.string
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			text: this.props.text || ''
		}
	}

	handleSubmit(e) {
		const text = e.target.value.trim();
		if (e.which === 13) {
			events.postNewTodo(e.target.value.trim());
			this.props.onSave(text);
			if (this.props.newTodo) {
				this.setState({text: ''})
			}
		}
	}

	handleChange(e) {
		this.setState({text: e.target.value});
	}

	handleBlur(e) {
		if (!this.props.newTodo) {
			this.props.onSave(e.target.value);
		}
	}

	render() {
		const isEditing = this.props.editing ? 'edit' : '';
		const isNew = this.props.newTodo ? 'new-todo' : '';

		return (
			<form action={"/todos?filter=" + this.props.filter }
				  method="POST"
				  onSubmit={ (e) => e.preventDefault() }>
				<input className={ isEditing + ' ' + isNew }
					   name="todo"
					   type="text"
					   placeholder={this.props.placeholder}
					   autoFocus="true"
					   value={this.state.text}
					   onBlur={this.handleBlur.bind(this)}
					   onChange={this.handleChange.bind(this)}
					   onKeyDown={this.handleSubmit.bind(this)}/>
			</form>
		);
	}
}

export default TodoTextInput;
