/*-------------------------------------------------------------------------------------------------------------------*\
 |  Copyright (C) 2015 PayPal                                                                                          |
 |                                                                                                                     |
 |  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
 |  with the License.                                                                                                  |
 |                                                                                                                     |
 |  You may obtain a copy of the License at                                                                            |
 |                                                                                                                     |
 |       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
 |                                                                                                                     |
 |  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
 |  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
 |  the specific language governing permissions and limitations under the License.                                     |
 \*-------------------------------------------------------------------------------------------------------------------*/

'use strict';

const PORT = 3000;

import { join } from 'path';
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as ReactEngine from 'react-engine';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import configureStore from './store/configureStore';

let app = express();

let store = configureStore();

require('babel-register')({
	presets: ['es2015', 'react']
});

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
	routesFilePath: join(__dirname, '/public/routes.jsx'),
	performanceCollector: function(stats) {
		console.log(stats);
	}
});

let upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set the engine
app.engine('.js', engine);

// set the view directory
app.set('views', join(__dirname, '/components'));

// set jsx as the view engine
app.set('view engine', 'js');

// finally, set the custom view
app.set('view', ReactEngine.expressView);

// expose public folder as static assets
app.use(express.static(join(__dirname, '/')));

console.log(__dirname);

// app.use(favicon(join(__dirname, '/public/favicon.ico')));

// add our app routes
app.get('/', function(req, res) {
	store.dispatch({ type: 'SHOW_ALL' });
	res.render('Layout', store.getState());
});
app.get('/show_all', function(req, res) {
	store.dispatch({ type: 'SHOW_ALL' });
	res.render('Layout', store.getState());
});
app.get('/show_active', function(req, res) {
	store.dispatch({ type: 'SHOW_ACTIVE' });
	res.render('Layout', store.getState());
});
app.get('/show_completed', function(req, res) {
	store.dispatch({ type: 'SHOW_COMPLETED' });
	res.render('Layout', store.getState());
});
app.post('/todos', function(req, res) {
	console.log('####### req.body ', req.body);
	store.dispatch({ type: req.query.filter.toUpperCase() });
	store.dispatch({ type: 'ADD_TODO', text: req.body.todo });
	res.redirect('/' + req.query.filter);
});

app.use(function(err: any, req: any, res: any, next: any) {
	console.error(err);

	// http://expressjs.com/en/guide/error-handling.html
	if (res.headersSent) {
		return next(err);
	}

	if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
		return res.redirect(302, err.redirectLocation);
	}
	else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
		return res.status(404).send('Route Not Found!');
	}
	else {
		// for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
		// any other error we just send the error message back
		return res.status(500).send(err.message);
	}
});

const server = app.listen(PORT, function() {
	console.log('Example app listening at http://localhost:%s', PORT);
});
