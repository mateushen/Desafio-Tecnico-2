const express = require('express');
const controller = require('../controllers/userController');
const auth = require('../middlewares/auth');
const route = express.Router();

route.post('/create', controller.create);
route.post('/login', controller.login);
route.get('/find/:id', auth, controller.find);

module.exports = route;