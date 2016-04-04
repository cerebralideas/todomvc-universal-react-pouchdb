'use strict';
var PORT = 3000;
var path_1 = require('path');
var express = require('express');
var ReactEngine = require('react-engine');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var server_routes_1 = require('./initiators/server-routes');
var app = express();
require('babel-register')({
    presets: ['es2015', 'react']
});
var engine = ReactEngine.server.create({
    routesFilePath: path_1.join(__dirname, '/public/routes.jsx'),
    performanceCollector: function (stats) { }
});
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('.js', engine);
app.set('views', path_1.join(__dirname, '/components'));
app.set('view engine', 'js');
app.set('view', ReactEngine.expressView);
app.use(express.static(path_1.join(__dirname, '/')));
server_routes_1.default(app);
app.use(function (err, req, res, next) {
    console.error(err);
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
        return res.status(500).send(err.message);
    }
});
var server = app.listen(PORT, function () {
    console.log('Example app listening at http://localhost:%s', PORT);
});
//# sourceMappingURL=server.js.map