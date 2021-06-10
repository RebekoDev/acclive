const jwt = require('jsonwebtoken');
const {secret} = require('../config/express.server.config');

const authCheck = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            throw new Error(req);
        }
        const decodeData = jwt.verify(token, secret);
        req.user = decodeData;
        next();
    } catch(e) {
        console.error(e);
        res.status(403).send({message: 'Пользователь должен быть авторизован'});
    }
};

exports.authCheck = authCheck;
