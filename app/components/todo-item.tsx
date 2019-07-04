import React from 'react';
import TodoTextInput from './todo-text-input';
import { deleteTodo, completeTodo, editingTodo } from '../events/client-events';

import { Todo, State } from '../interfaces';
import { connect } from 'react-redux';

interface Prop {
	todo: Todo;
	filter: string

}
function TodoItem ({ todo, filter }: Prop) { // save

	let isCompleted = todo.completed ? 'completed' : '',
		isEditing = todo.editing ? 'editing' : '',
		newTodo = false,
		element;

	if (todo.editing) {
		element = (
			<TodoTextInput todo={ todo }
				newTodo={ newTodo }
				filter={ filter }
				placeholder="Leaving empty deletes todo!"/>
		);
	} else {
		element = (
			<div className="view">
				<input className="toggle"
					type="checkbox"
					checked={ todo.completed }
					onChange={ () => completeTodo(todo.id) }/>
				<label onDoubleClick={ () => editingTodo(todo.id) }>
					{todo.title}
				</label>
				<button className="destroy"
					onClick={ () => deleteTodo(todo.id) }/>
			</div>
		);
	}

	return (
		<li key={ todo.id } className={ isCompleted + ' ' + isEditing }>
			{element}
		</li>
	);
}

export default connect((state: State, ownProps: { todoId: number }) => ({
	filter: state.filter,
	todo: state.todos[ownProps.todoId]
}))(TodoItem);
