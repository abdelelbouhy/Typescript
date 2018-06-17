import express from 'express';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';
import * as childProcess from 'child_process';
import config from './config'


const app = express();

app
	.set('view engine', 'ejs')
	.set('views', path.resolve(__dirname, '../views'))
	.use('/dist', express.static(path.resolve(__dirname, '../dist/')))
	.listen(3000, () => {
		const command = /linux|darwin/.test(process.platform) ? 'open' : process.platform === 'win32' ? 'start' : '';

		if (command) {
			childProcess.exec(`${command} -a "Google Chrome" http://localhost:3000`, () => {

			});

			console.log('http://localhost:3000');
		} else {
			console.log('http://localhost:3000');
		}

	});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/*', (req, res) => {
	res.render('index');
});

app.post('/getMoviesList', (req, res) => {
    console.log(req.body.payload.queryString.replace('&amp;', '&'))
	axios.get(`${config.baseUrl}${req.body.payload.queryString.replace('&amp;', '&')}`)
		.then(response => {
			res.send(JSON.stringify(response.data));
		})
		.catch(error => {
			console.log(error);
		});
});

app.post('/getMovieItem', (req, res) => {
	axios.get(`${config.baseUrl}&s=${encodeURIComponent(req.body.payload.queryString.trim())}`)
		.then(response => {
			res.send(JSON.stringify(response.data));
		})
		.catch(error => {
			console.log(error);
		});
});
