import { createAction } from 'redux-actions';

/**
 * Required use of `any` below due to redux-actions' typing flaw
 */
export const addTodo: any = createAction('ADD_TODO', (title): { title: string } => ({ title }));
export const deleteTodo: any = createAction('DELETE_TODO', (id): { id: number } => ({ id }));
export const editingTodo: any = createAction('EDITING_TODO', (id): { id: number } => ({ id }));
export const editTodo: any = createAction('EDIT_TODO', (id, title): { id: number; title: string } => ({ id, title }));
export const completeTodo: any = createAction('COMPLETE_TODO', (id): { id: number } => ({ id }));
export const completeAll: any = createAction('COMPLETE_ALL', (): {} => ({}));
export const clearCompleted: any = createAction('CLEAR_COMPLETED', (): {} => ({}));
export const showAll: any = createAction('SHOW_ALL', (): { filter: string } => ({ filter: 'show_all' }));
export const showActive: any = createAction('SHOW_ACTIVE', (): { filter: string } => ({ filter: 'show_active' }));
export const showCompleted: any = createAction('SHOW_COMPLETED', (): { filter: string } => ({
	filter: 'show_completed'
}));
