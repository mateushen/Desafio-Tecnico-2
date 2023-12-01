const express = require('express');
const bp = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const user = require('./routes/user');
app.use('/', user);


app.listen(3000, () => {
  console.log('Server rodando');
});