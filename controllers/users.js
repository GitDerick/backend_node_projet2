// Imports internes
const User = require('../models/User');

// Obtenir la liste des utilisateurs sans les informations de position et la version
exports.getUsers = async (req, res) => {
    try {
        // Rechercher tous les utilisateurs et exclure la "position" et "__v"
        const correct = await User.find().select("-position -__v");

        // Envoyer une réponse réussie avec la liste des utilisateurs
        res.status(200).send({ 'success': true, 'data': correct });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};
