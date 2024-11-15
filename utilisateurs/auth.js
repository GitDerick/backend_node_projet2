// External imports
const jwt = require('jsonwebtoken')

// Internal imports
const auth = require('../models/User');

exports.protect = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token.startsWith('Bearer')) {
            return res.send('Not authorized to access this route');
        }

        if (token === undefined) {
            return res.status(401).send('Not authorized to access this route');
        }

        token = token.split(' ')[1];

        const tokenDecoded = jwt.verify(token, 'TEC_MAP');
        req.id = tokenDecoded.id;

        next();

    } catch (error) {
        return res.status(401).send('Not authorized to access this route');
    }

}



exports.isAdmin = (req, res, next) => {
    // Recuperer le Id du req
    const userId = req.id;

    //Verifier si la personne existe dans la liste
    const user = auth.findById(userId);
    if (user === null) {
        return res.send('Not authorized to access this route');
    }

    //S'assurer que la personne est admin
    if (!user.isAdmin) {
        return res.send('Not authorized to access this route');
    }

    next();
}
