import { createAction } from 'redux-actions';

/**
 * Required use of `any` below due to redux-actions' typing flaw
 */
export const addTodo = createAction('ADD_TODO', (title): { title: string } => ({ title }));
export const deleteTodo = createAction('DELETE_TODO', (id): { id: number } => ({ id }));
export const editingTodo = createAction('EDITING_TODO', (id): { id: number } => ({ id }));
export const editTodo = createAction('EDIT_TODO', (id, title): { id: number; title: string } => ({ id, title }));
export const completeTodo = createAction('COMPLETE_TODO', (id): { id: number } => ({ id }));
export const completeAll = createAction('COMPLETE_ALL', (): {} => ({}));
export const clearCompleted = createAction('CLEAR_COMPLETED', (): {} => ({}));
export const showAll = createAction('SHOW_ALL', (): { filter: string } => ({ filter: 'show_all' }));
export const showActive = createAction('SHOW_ACTIVE', (): { filter: string } => ({ filter: 'show_active' }));
export const showCompleted = createAction('SHOW_COMPLETED', (): { filter: string } => ({
	filter: 'show_completed'
}));
