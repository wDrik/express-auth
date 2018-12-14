const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

require('./app/controllers/index')(app);

app.listen(port, () => console.log(`Server started on port ${port}`))
