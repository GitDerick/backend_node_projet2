// Importations internes
const User = require('../models/User');

// Obtenir la liste des amis
exports.getFriends = async (req, res) => {
    try {
        // Filtre pour rechercher les amis de l'utilisateur par son ID
        const filter = { '_id': userId };

        // Rechercher les amis de l'utilisateur, sélectionner uniquement les champs 'friends', et effectuer une population pour afficher les détails de l'utilisateur
        const correct = await User.find(filter).select('friends').populate('userId username');

        // Envoyer une réponse réussie avec les données récupérées
        res.status(200).send({ 'success': true, 'data': correct });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Ajouter un seul ami
exports.postSingleFriend = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur actuel et l'ID de l'ami à ajouter à partir des paramètres de la requête
        const { id } = req;
        const { userId } = req.params;

        // Filtre pour rechercher l'utilisateur actuel et l'ami à ajouter
        const filter = {
            'userId': userId,
            '_id': id
        };

        // Rechercher l'utilisateur dans la base de données
        const friend = await User.findOne(filter);

        // Vérifier si l'utilisateur à ajouter existe déjà dans la liste d'amis
        if (friend !== null) {
            return res.status(409).send('User already exists');
        }

        // Vérifier si l'utilisateur actuel essaie de s'ajouter lui-même comme ami
        if (userId === id) {
            return res.status(409).send({ 'success': false, 'msg': 'You cannot add yourself' });
        }

        // Filtre pour rechercher l'utilisateur à ajouter comme ami
        const filtre = { '_id': userId };

        // Rechercher l'utilisateur à ajouter dans la base de données
        const addFriend = await User.findOne(filtre);

        // Vérifier si l'utilisateur à ajouter existe
        if (addFriend === null) {
            return res.status(404).send({ 'success': false, 'msg': `No user found with id : ${userId}` });
        }

        // Ajouter l'ID de l'utilisateur à ajouter à la liste d'amis de l'utilisateur actuel et enregistrer dans la base de données
        addFriend.friends.push(userId);
        await addFriend.save();

        // Envoyer une réponse réussie
        res.status(200).send({ 'success': true, 'msg': 'Friend added' });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};

// Supprimer un seul ami
exports.deleteSingleFriend = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur actuel et l'ID de l'ami à supprimer à partir des paramètres de la requête
        const { id } = req;
        const { userId } = req.params;

        // Filtre pour rechercher l'utilisateur actuel et l'ami à supprimer
        const filter = { 'userId': userId, '_id': id };

        // Rechercher l'utilisateur actuel dans la base de données
        const friend = await User.findOne(filter);

        // Vérifier si l'utilisateur est dans la liste d'amis
        const isUserInFriendsList = friend.friends.includes(userId);
        if (!isUserInFriendsList) {
            return res.status(409).send({ 'success': false, 'msg': "This user is not in your friends list" });
        }

        // Vérifier si l'utilisateur actuel essaie de se supprimer lui-même de la liste d'amis
        if (userId === id) {
            return res.status(409).send({ 'success': false, 'msg': "You cannot delete yourself" });
        }

        // Filtrer la liste d'amis pour supprimer l'ID de l'ami à supprimer
        const updatedFriendsList = friend.friends.filter(friendId => friendId !== userId);
        friend.friends = updatedFriendsList;

        // Enregistrer la liste mise à jour dans la base de données
        await friend.save();

        // Envoyer une réponse réussie
        res.status(200).send({ 'success': true, 'msg': 'Deleted friend' });

    } catch (error) {
        // Envoyer une réponse d'erreur en cas d'exception
        res.send({ 'success': true, 'msg': error });
    }
};