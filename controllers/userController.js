const asyncHandler = require("express-async-handler");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth");

function generateToken(userId) {
    return jwt.sign({ id: userId }, authConfig.secret, { expiresIn: authConfig.expiresIn });
}

exports.find = asyncHandler(async (req, res, next) => {
    await User.sync();

    const id = req.body;

    const user = await User.findOne({ where: { id } });

    if (user) {
        return res.status(200).json({ user: user, req: req.params });
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

                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                });

                return res.send({
                    user,
                    token: token
                });

            } else {
                return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
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
        console.log(req.body);
        if (name && email && password && telephone) {
            const pwCrip = await bcrypt.hash(password, 10);
            const user = await User.create({ name: name, email: email, password: pwCrip, telephone: telephone });

            return res.send({
                user,
                token: generateToken({ id: user.id })
            });

        } else {
            res.status(500).json({
                mensagem: 'Email já existente'
            });
        }
    } catch (error) {
        res.status(500).json({
            mensagem: error
        });
    }
});