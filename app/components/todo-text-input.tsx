import React from 'react';
import { formSubmission } from '../events/client-events';

import { Todo } from '../interfaces';

interface Props {
	placeholder: string;
	filter: string;
	editing?: boolean;
	flipEdit?: (boolean) => void;
	todo?: Todo;
	newTodo?: boolean;
}

function TodoTextInput({
		editing,
		newTodo,
		placeholder,
		todo,
		flipEdit,
		filter
	}: Props) {
		let isEditing = editing ? 'edit' : '';
		let isNew = newTodo ? 'new-todo' : '';

		function saveChange(event, id) {
			if (editing) {
				formSubmission(event, id, flipEdit);
			}
		}

		return (
			<form id='todoForm'
				method='POST'
				action={ `/todos?=filter=${filter ? filter : '' }`}
				onSubmit={
					(event) => formSubmission(event, todo && todo.id, flipEdit)
				}>

				<input id="todoInput"
					className={ isEditing || isNew }
					name='title'
					type='text'
					placeholder={ placeholder }
					defaultValue={ todo.title }
					autoFocus={ editing }
					onBlur={ (event) => saveChange(event, todo.id) } />
			</form>
		);
	}

export default TodoTextInput;
