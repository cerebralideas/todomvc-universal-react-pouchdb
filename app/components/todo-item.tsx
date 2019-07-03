import * as React from 'react';
import TodoTextInput from './todo-text-input';
import { deleteTodo, completeTodo, editingTodo } from '../events/client-events';

interface Props {
	filter: string;
	todo: any;
}

function TodoItem (props: Props) { // save

	let { todo, filter } = props;
	let isCompleted = todo.completed ? 'completed' : '';
	let isEditing = todo.editing ? 'editing' : '';
	let newTodo = false;
	let element;

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
		<li className={ isCompleted + ' ' + isEditing }>
			{element}
		</li>
	);
}

export default TodoItem;
