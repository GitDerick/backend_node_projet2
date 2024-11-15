// Internal imports
const User = require('../models/User');

// Obtenir la position des amis de l'utilisateur
exports.positionFriends = async (req, res) => {
    try {
        // Rechercher tous les utilisateurs et sélectionner les informations nécessaires
        const correct = await User.find().select('userId lat long');
        // Envoyer une réponse réussie avec les données des amis
        res.status(200).send({'success': true, 'data': correct });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Mettre à jour la position de l'utilisateur actuel
exports.putPosition = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const { id } = req;
        // Récupérer les nouvelles coordonnées de l'utilisateur à partir du corps de la requête
        const { lat, long } = req.body;

        // Vérifier si les coordonnées sont définies et non vides
        if (lat === undefined || long === undefined || lat.trim() === '' || long.trim() === '') {
            res.status(400).send('Invalid body');
        }

        // Filtre pour rechercher l'utilisateur par son ID
        const filter = {'_id': id};

        // Mettre à jour les coordonnées de l'utilisateur dans la base de données
        await User.updateOne(filter, {'lat': lat, 'long': long});

        // Envoyer une réponse réussie
        return res.status(200).send(`User updated with id : ${id}`);

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};
