'use strict';

const PORT = 3000;

import { join } from 'path';
import * as express from 'express';
import * as React from 'react';
import * as favicon from 'serve-favicon';
import * as ReactEngine from 'react-engine';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import routes from './initiators/server-routes';

let app = express();

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({
	performanceCollector: function(stats) {}
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.engine('.js', engine);// set the engine
app.set('views', join(__dirname, '/components'));// set the view directory
app.set('view engine', 'js');// set js as the view engine
app.set('view', ReactEngine.expressView);// finally, set the custom view
app.use(express.static(join(__dirname, '/')));// expose public folder as static assets
app.use(favicon(join(__dirname, '/favicon.ico')));// Use the favicon

routes(app);// Initialize the server routes

const server = app.listen(PORT, function() {
	console.log('Example app listening at http://localhost:%s', PORT);
});
