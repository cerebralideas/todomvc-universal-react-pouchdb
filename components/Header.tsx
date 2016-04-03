import * as React from 'react';
import { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

interface Props {
	addTodo?: Function;
}
interface State {}

class Header extends Component<Props, State> {
	static propTypes = {
		addTodo: PropTypes.func.isRequired
	};
	
	handleSave(text) {
		if (text.length !== 0) {
			this.props.addTodo(text)
		}
	}

	render() {
		return (
			<header className="header">
				<h1>todos</h1>
				<TodoTextInput newTodo
							   onSave={this.handleSave.bind(this)}
							   placeholder="What needs to be done?"/>
			</header>
		);
	}
}

export default Header;
