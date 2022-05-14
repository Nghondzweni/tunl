import express from 'express';
import log from './logger/index'
import connect from './db/connect'
import routes from './routes'
import {deserializeUser} from './middleware/deserializeUser'


// configure environment variables
require ('dotenv').config();

const http = require('http');
const https =  require('https');

//Environment Variables
const port = Number(process.env.PORT) as number;
const host = process.env.HOST as string;

const app = express();


// App Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(deserializeUser)

app.listen(port, host, () => {
    log.info(`Serrver listening on at http://${host}:${port}`);

    connect();
    routes(app);
});