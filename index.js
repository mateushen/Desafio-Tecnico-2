const express = require('express');
const path = require('path');
const bp = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbconnection = require('./database/index');
const app = express();

app.use(express.json());

const route = require('./routes/index');

app.use('/user', route);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


var sessionStore = new SequelizeStore({
  db: dbconnection,
});

const thirtyMinutes = 1000 * 60 * 30;
app.use(session({
  secret: "123456789",
  saveUninitialized: true,
  cookie: { maxAge: thirtyMinutes },
  resave: false,
  store: sessionStore
}));

sessionStore.sync();

app.listen(3000, () => {
  console.log('Server rodando');
});
