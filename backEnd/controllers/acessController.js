// controllers/accessController.js
import Permissao from '../models/Permissao.js';
import App from '../app.js'; // Atualize o caminho conforme necessário

const permissaoModel = new Permissao(App.db);

const getAllScreens = async (req, res) => {
    try {
        const screens = await permissaoModel.getAllScreens();
        res.json(screens);
    } catch (error) {
        res.status(500).send('Error fetching screens');
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await permissaoModel.getAllGroups();
        res.json(groups);
    } catch (error) {
        res.status(500).send('Error fetching groups');
    }
};

const getUserPermissions = async (req, res) => {
    const usuarioId = req.params.usuarioId;
    try {
        const permissions = await permissaoModel.getUserPermissions(usuarioId);
        res.json(permissions);
    } catch (error) {
        res.status(500).send('Error fetching user permissions');
    }
};

const updateScreenPermissions = async (req, res) => {
    const { tela_id, grupo_id } = req.body;
    try {
        await permissaoModel.updateScreenPermissions(tela_id, grupo_id);
        res.status(200).json({ message: 'Permissions updated successfully!' });
    } catch (error) {
        res.status(500).send('Error updating permissions');
    }
};

export default {
    getAllScreens,
    getAllGroups,
    getUserPermissions,
    updateScreenPermissions
};
