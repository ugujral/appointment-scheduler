const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Connected on port ${port}`));
