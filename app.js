const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const { join } = require('path');

const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
app.use(express.static(join(__dirname, 'public', 'patient_screen')));
app.use(express.static(join(__dirname, 'public', 'employee')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/patient', (_, res) => res.sendFile(join(__dirname, 'public', 'patient_screen', 'patient.html')));
app.get('/employee', (_, res) => res.sendFile(join(__dirname, 'public', 'employee', 'employee.html')));

app.use('/', indexRouter);

app.use(bodyParser.json());


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
