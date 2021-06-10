const express = require('express');
const config = require('./config/express.server.config');
const indexRouter = require('./router/indexRouter');

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  

app.use(indexRouter);

module.exports = app;
