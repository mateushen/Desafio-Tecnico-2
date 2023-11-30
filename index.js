const express = require('express');
const path = require('path');
const bp = require('body-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbconnection = require('./database/index.js');
const app = express();

app.use(express.json());

const despesa = require('./routes/despesa');
const funcionario = require('./routes/funcionario');
const obra = require('./routes/obra');
const servico = require('./routes/servico');
const usuario = require('./routes/usuario');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


var sessionStore = new SequelizeStore({
  db: dbconnection,
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "123456789",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  store: sessionStore
}));

sessionStore.sync();


const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));


app.get('/', (req, res) => {
  checkUsuario().then((response) => {
    if (response) {
      res.render('usuario/login');
    } else {
      res.render('usuario/cadastro');
    }
  })
});

app.listen(3000, () => {
  console.log('Server rodando')
});
