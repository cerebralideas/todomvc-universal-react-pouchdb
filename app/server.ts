import { join } from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import ReactEngine from 'react-engine';
import expressView from 'react-engine/lib/expressView';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes/server-routes';

let app = express();
const PORT = 3000;

// create the view engine with `react-engine`
let engine = ReactEngine.server.create({});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies
app.engine('.js', engine);// set the engine
app.set('views', join(__dirname, '/'));// set the view directory
app.set('view engine', 'js');// set js as the view engine
app.set('view', expressView);// finally, set the custom view
app.use(express.static(join(__dirname, '../')));// expose public folder as static assets
app.use(favicon(join(__dirname, '/favicon.ico')));// Use the favicon

routes(app);// Initialize the server routes

app.listen(PORT, (): void => {
	console.log('Example app listening at http://localhost:%s', PORT);
});
