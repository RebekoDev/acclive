const express = require('express');
const AuthController = require('../controller/authController');
const {check} = require('express-validator');
const {authCheck} = require('../util/auth');

const router = express.Router();
const authController = new AuthController();

router.post('/api/registr', [
    check('username', 'Имя пользователя должно быть строкой').notEmpty(),
    check('password', 'Пароль должен содержать не менее 6 символов').isLength(6),
], authController.registr);
router.post('/api/login', authController.login);
router.post('/api/profile', authCheck, (res, req) => {
    req.send('Hello');
});

module.exports = router;
