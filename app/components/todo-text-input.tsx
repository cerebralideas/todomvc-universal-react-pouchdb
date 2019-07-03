import * as React from 'react';
import { formSubmission } from '../events/client-events';

interface Props {
	placeholder: string;
	filter: string;
	todo?: any;
	newTodo?: boolean;
}

function TodoTextInput(props: Props) {
	let isEditing = props.todo.editing ? 'edit' : '';
	let isNew = props.newTodo ? 'new-todo' : '';

	function saveChange(event) {
		if (isEditing) {
			formSubmission(event, props.todo.id)
		}
	}
	return (
		<form method="POST"
			  action={ "/todos?=filter=" + props.filter }
			  onSubmit={ (event) => { formSubmission(event, props.todo && props.todo.id) }}>
			<input className={ isEditing || isNew }
				   name="title"
				   type="text"
				   placeholder={ props.placeholder }
				   defaultValue={ props.todo.title }
				   onBlur={ saveChange } />
		</form>
	);
}

export default TodoTextInput;
