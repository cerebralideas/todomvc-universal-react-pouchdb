'use strict';
var PORT = 3000;
var path_1 = require('path');
var express = require('express');
var ReactEngine = require('react-engine');
var app = express();
var engine = ReactEngine.server.create({
    routesFilePath: path_1.join(__dirname, '/public/routes.jsx'),
    performanceCollector: function (stats) {
        console.log(stats);
    }
});
app.engine('.jsx', engine);
app.set('views', path_1.join(__dirname, '/public/views'));
app.set('view engine', 'jsx');
app.set('view', ReactEngine.expressView);
app.use(express.static(path_1.join(__dirname, '/')));
app.get('*', function (req, res) {
    res.send('index.html');
});
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