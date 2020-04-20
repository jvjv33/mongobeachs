const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('../src/app/controllers/beachController')(app);

app.listen(port, function () {
    console.log('Works on port:', port);
})