import React from 'react';
import { formSubmission } from '../events/client-events';

import { Todo } from '../interfaces';

interface Props {
	placeholder: string;
	filter: string;
	todo?: Todo;
	newTodo?: boolean;
}

function TodoTextInput(props: Props) {
	let isEditing = props.todo.editing ? 'edit' : '';
	let isNew = props.newTodo ? 'new-todo' : '';

	function saveChange(event, id) {
		if (isEditing) {
			formSubmission(event, id)
		}
	}

	return (
		<form id='todoForm'
			method='POST'
			action={ `/todos?=filter=${props.filter ? props.filter : '' }`}
			onSubmit={ (event) => formSubmission(event, props.todo && props.todo.id) }>

			<input id="todoInput"
				className={ isEditing || isNew }
				name='title'
				type='text'
				placeholder={ props.placeholder }
				defaultValue={ props.todo.title }
				onBlur={ (event) => saveChange(event, props.todo.id) } />
		</form>
	);
}

export default TodoTextInput;
