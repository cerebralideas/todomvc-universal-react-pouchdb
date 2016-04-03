import * as React from 'react';
import { Component, PropTypes } from 'react';
import * as classnames from 'classnames';

if (typeof window === 'object') {
	classnames = classnames.default;
}

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
		return (
			<form action={"/todos?filter=" + this.props.filter } 
				  method="POST"
				  onSubmit={ (e) => e.preventDefault() }>
				<input className={
					       classnames({
						       edit: this.props.editing,
						       'new-todo': this.props.newTodo
					       })
					   }
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
