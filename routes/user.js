const express = require('express');
const controller = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');
const route = express.Router();

route.post('/create', controller.create);
route.post('/login', controller.login);
route.delete('/:id', controller.delete);
route.get('/all', verifyToken, controller.all);
route.get('/test', verifyToken, controller.test);

module.exports = route;