const jwt = require('jsonwebtoken');

const SECRET_KEY = 'seu-segredo-aqui';


function generateToken(user) {
    return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}


function checkAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = { generateToken, checkAuthenticated };