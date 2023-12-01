const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth");

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 30
    });
  }

exports.all = asyncHandler(async (req, res, next) => {
    await User.sync();

    const users = await User.findAll();
    if (users) {
        return res.status(200).json({ users: users });
    } else {
        return res.status(401).json({ message: 'Nenhum usuário encontrado' });
    }
});

exports.login = asyncHandler(async (req, res, next) => {
    await User.sync();

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {

                res.send({ user, token: generateToken({ id: user.id }) });

                // return res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        }
    } catch (error) {
        res.status(500).json({
            mensagem: error
        });
    }
});

exports.create = asyncHandler(async (req, res, next) => {
    await User.sync();

    try {
        const { name, email, password, telephone } = req.body;
        if (name && email && password && telephone) {
            const pwCrip = await bcrypt.hash(password, 10);
            const user = await User.create({ name: name, email: email, password: pwCrip, telephone: telephone });
            const token = generateToken(user);
            res.json({ token });
            // res.status(200).json({
            //     mensagem: 'Dados cadastrados'
            // });
        } else {
            res.status(500).json({
                mensagem: 'Erro ao realizar o login'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensagem: error
        });
    }
});

exports.delete = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log(id);
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy({ where: { id } });
            res.status(200).json({
                mensagem: 'Dados excluídos'
            });
        } else {
            res.status(500).json({
                mensagem: 'Erro ao excluir'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensagem: error
        });
    }
});

exports.test = asyncHandler(async (req, res, next) => {
    if (req.user) {
        res.json({ message: 'Rota protegida' });
    } else {
        res.status(401).json({ error: 'Token inválido ou não fornecido' });
    }
});