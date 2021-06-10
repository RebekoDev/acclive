const User = require('../models/user');
const Role = require('../models/role');
const bcript = require('bcryptjs');
const {validationResult} = require('express-validator');
const {secret} = require('../config/express.server.config');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class AuthController {
    async registr(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                res.status(400).send({message: 'Ошибка регистрации:', errors})
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate) {
                res.status(400).send({message: 'Registration error: a user with this name has already been created'});
            }
            const userRole = await Role.findOne({value: 'user'});
            const passwordHash = bcript.hashSync(password, 5);
            const user = new User({
                username,
                password: passwordHash,
                roles: [
                    userRole.value
                ],
            });
            user.save();
            res.send({message: 'User created successfully'});
        } catch(e) {
            console.error(e);
            res.status(400).send({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                res.status(400).send({message: `Пользователь ${username} не найден`});
            };
            const validPassword = bcript.compareSync(password, user.password);
            if(!validPassword){
                res.status(400).send({message: 'Введен неверный пароль'});
            }
            const token = generateAccessToken(user._id, user.roles);
            res.send({token});
        } catch(e) {
            console.error(e);
            res.status(400).send({message: 'Login error'})
        }
    }
}

module.exports = AuthController;
