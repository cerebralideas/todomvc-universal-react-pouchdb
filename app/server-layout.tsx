import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './views/app';

import { Todo } from './interfaces';

function Layout({ todos, filter, serveStatic }: { todos: Todo[], filter: string, serveStatic: boolean }) {

	let store = createStore(rootReducer, { todos, filter });

	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8" />
			<title>Universal React • TodoMVC</title>
			<link rel="stylesheet" href="public/main.css" />
		</head>
		<body>
		<section className="todoapp" id="root">
			<Provider store={ store }>
				<App />
			</Provider>
		</section>
		<footer className="info">
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="http://github.com/cerebrl/">Justin Lowery</a></p>
			<p>Inspired by <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
		<script type="text/javascript" src="public/main.js"></script>

		</body>
		</html>
	);
}
// Old module.exports is required for React-Engine :(
module.exports = Layout;
