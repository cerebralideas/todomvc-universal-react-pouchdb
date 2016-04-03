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
import * as cookieParser from 'cookie-parser';
import * as multer from 'multer';

import * as PouchDB from 'pouchdb';
import configureStore from './store/configureStore';

let app = express();
let db = new PouchDB('users');

require('babel-register')({
	presets: ['es2015', 'react']
});

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
	routesFilePath: join(__dirname, '/public/routes.jsx'),
	performanceCollector: function(stats) {}
});

let upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies

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

// app.use(favicon(join(__dirname, '/public/favicon.ico')));

// Database GET
function dbGet(req, res, configureStore, callback) {
	let filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL';

	db.get(req.ip, function (err: any, doc: any) {
		let store = configureStore(doc.store);
		store.dispatch({ type: filter });
		
		let model = {
			_id: doc._id,
			_rev: doc._rev,
			store: store.getState()
		};
		db.put(model, function (err: any, doc: any) {
			callback(req, res, model.store);
		});
	});
}
// Database PUT
function dbPut(req, res, store, callback) {
	let filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';

	db.get(req.ip, function (err: any, doc: any) {
		let store = configureStore(doc.store);
		store.dispatch({ type: filter });
		store.dispatch({ type: 'ADD_TODO', text: req.body.todo });
		
		let model = {
			_id: doc._id,
			_rev: doc._rev,
			store: store.getState()
		};
		db.put(model, function (err: any, doc: any) {
			console.log(model.store);
			callback(req, res, model.store);
		});
	});
}

// Routes
app.get('/', function(req, res) {
	dbGet(req, res, configureStore, function (req, res, model) {
		res.render('Layout', model);
	});
});
app.get('/:filter', function(req, res) {
	dbGet(req, res, configureStore, function (req, res, model) {
		res.render('Layout', model);
	});
});
app.post('/todos', function(req, res) {
	dbPut(req, res, configureStore, function (req, res, model) {
		res.redirect('/' + req.query.filter);
	});
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
