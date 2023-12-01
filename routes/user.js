const express = require('express');
const controller = require('../controllers/userController');
const route = express.Router();

route.post('/create', controller.create);
route.post('/login', controller.login);
route.delete('/:id', controller.delete);
route.get('/all', controller.all);

module.exports = route;