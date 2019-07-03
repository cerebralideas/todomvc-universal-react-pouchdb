import { createAction } from 'redux-actions';

export const addTodo: any = createAction('ADD_TODO', (title) => ({ title }));
export const deleteTodo: any = createAction('DELETE_TODO', (id) => ({ id }));
export const editingTodo: any = createAction('EDITING_TODO', (id) => ({ id }));
export const editTodo: any = createAction('EDIT_TODO', (id, title) => ({ id, title }));
export const completeTodo: any = createAction('COMPLETE_TODO', (id) => ({ id }));
export const completeAll: any = createAction('COMPLETE_ALL', () => ({}));
export const clearCompleted: any = createAction('CLEAR_COMPLETED', () => ({}));
export const showAll: any = createAction('SHOW_ALL', () => ({ filter: 'show_all' }));
export const showActive: any = createAction('SHOW_ACTIVE', () => ({ filter: 'show_active' }));
export const showCompleted: any = createAction('SHOW_COMPLETED', () => ({ filter: 'show_completed' }));
