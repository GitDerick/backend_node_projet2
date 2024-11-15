// Importations externes
const jwt = require('jsonwebtoken');

// Importations internes
const User = require('../models/User');

// Route de connexion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'email et le mot de passe sont fournis
        if (email === undefined || password === undefined || email.trim() === '' || password.trim() === '') {
            res.status(400).send('Corps de la requête invalide');
        }

        // Crée un objet avec l'email et le mot de passe pour la requête à la base de données
        const correct = { 'email': email, 'password': password };
        
        // Recherche un utilisateur avec l'email et le mot de passe fournis
        const auth = await User.findOne(correct);

        // Si aucun utilisateur n'est trouvé, renvoie une erreur
        if (auth == null) {
            return res.status(401).send('Aucun utilisateur trouvé avec ces informations');
        }

        // Génère un jeton JWT avec l'ID de l'utilisateur
        const token = jwt.sign({ 'id': auth._id }, 'TEC_MAP');

        // Envoie le jeton en tant que réponse
        res.status(200).send({ 'token': token });

    } catch (error) {
        // Envoie une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Route d'inscription
exports.register = async (req, res) => {
    try {
        const { email, password, username, fullname } = req.body;

        // Vérifie si les champs requis sont fournis
        if (
            email === undefined || password === undefined || username === undefined ||
            email.trim() === '' || password.trim() === '' || username.trim() === '' ||
            fullname.trim() === ''
        ) {
            return res.status(400).send('Corps de la requête invalide');
        }

        // Vérifie si un utilisateur existant possède déjà l'email fourni
        const existingUser = await User.findOne({ 'email': email });
        if (existingUser) {
            return res.status(409).send('Adresse e-mail déjà utilisée');
        }

        // Crée un objet avec les détails de l'utilisateur pour l'insertion dans la base de données
        const correct = { 'email': email, 'password': password, 'username': username, 'fullname': fullname };

        // Crée un nouvel utilisateur dans la base de données
        await User.create(correct);

        // Génère un token JWT avec l'ID de l'utilisateur
        const token = jwt.sign({ 'id': User._id }, 'TEC_MAP');

        // Envoie le token en tant que réponse
        res.status(201).send(token);

    } catch (error) {
        // Envoie une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};
