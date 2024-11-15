// Imports internes
const User = require('../models/User');

// Récupérer les informations de l'utilisateur actuel
exports.getMe = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const { id } = req;
        // Filtre pour rechercher l'utilisateur par son ID
        const filter = { '_id': id };
        // Rechercher l'utilisateur dans la base de données
        const userme = await User.findOne(filter);
        // Envoyer une réponse réussie avec les données de l'utilisateur
        return res.status(200).send(userme);

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Mettre à jour les informations de l'utilisateur actuel
exports.putMe = async (req, res) => {
    try {
        // Récupérer les nouvelles informations de l'utilisateur à partir du corps de la requête
        const { username, email } = req.body;
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const { id } = req;
        // Filtre pour rechercher l'utilisateur par son ID
        const filter = { '_id': id };
        
        // Données filtrées pour vérifier les doublons d'email
        const filterData = { 'username': username, 'email': email };
        // Rechercher un utilisateur avec les nouvelles informations dans la base de données
        const found = await User.findOne(filterData);
        // Vérifier si un utilisateur avec les mêmes informations existe déjà
        if (found !== null) {
            return res.status(409).send('Email is already used');
        }
        // Mettre à jour les informations de l'utilisateur dans la base de données
        await User.updateOne(filter, req.body);
        // Envoyer une réponse réussie
        res.status(200).send({ 'success': true, 'msg': 'User updated' });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Supprimer l'utilisateur actuel
exports.deleteMe = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const { id } = req;
        // Filtre pour rechercher l'utilisateur par son ID
        const filter = { '_id': id };
        // Supprimer l'utilisateur de la base de données
        await User.deleteOne(filter);
        // Envoyer une réponse réussie
        return res.status(204).send('User deleted');

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};
