const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
const url = 'http://localhost:3001/beach';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  res.redirect('/beach');
});

require('../src/app/controllers/beachController')(app);

app.listen(port, function () {
  console.log('URL:', url);
  console.log('Works on port:', port);
});
