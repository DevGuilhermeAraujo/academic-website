import App from '../app.js'; // Atualize o caminho conforme necessário

const getScreens = async (req, res) => {
    try {
        const screens = await App.permission.getAllScreens();
        res.json(screens);
    } catch (error) {
        res.status(500).send('Error fetching screens');
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await App.permission.getAllGroups();
        res.json(groups);
    } catch (error) {
        res.status(500).send('Error fetching groups');
    }
};

// Adicione isso no seu controller
const getGroupsData = async (req, res) => {
    const { screenId } = req.params;

    try {
        // Fetch both available and linked groups
        const availableGroups = await App.permission.getAvailableGroups(screenId);
        const linkedGroups = await App.permission.getLinkedGroups(screenId);
        // Send both sets of data in one response
        res.json({
            availableGroups,
            linkedGroups
        });
    } catch (error) {
        console.error('Erro ao buscar dados dos grupos:', error);
        res.status(500).send('Erro ao buscar dados dos grupos');
    }
};

const getGroupDetails = async (req, res) => {
    const { groupId } = req.params;
    try {
        const groupDetails = await App.permission.getGroupDetails(groupId);
        res.json(groupDetails);
    } catch (error) {
        res.status(500).send('Error fetching group details');
    }
};

const getAccessByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const access = await App.permission.getAccessByUser(userId);
        res.json(access);
    } catch (error) {
        res.status(500).send('Error fetching access');
    }
};

const updateAccess = async (req, res) => {
    const { userId, screenId } = req.params;
    const access = req.body;
    try {
        await App.permission.updateAccess(userId, screenId, access);
        res.json({ success: true });
    } catch (error) {
        res.status(500).send('Error updating access');
    }
};

// Endpoint para definir variáveis de sessão
const setSession = async (req, res) => {
    const { userId } = req.params;
    const dados = req.body;
    try {
        App.permission.setSessao(userId, dados);
        res.json({ success: true, message: 'Sessão definida com sucesso' });
    } catch (error) {
        res.status(500).send('Error setting session');
    }
};

// Endpoint para obter variáveis de sessão
const getSession = async (req, res) => {
    const { userId } = req.params;
    try {
        const sessao = App.permission.getSessao(userId);
        res.json(sessao);
    } catch (error) {
        res.status(500).send('Error fetching session');
    }
};

// Endpoint para obter grupos disponíveis para vinculação
const getAvailableGroups = async (req, res) => {
    const { screenId } = req.params;
    try {
        const availableGroups = await App.permission.getAvailableGroups(screenId);
        res.json(availableGroups);
    } catch (error) {
        res.status(500).send('Error fetching available groups');
    }
};

// Endpoint para obter grupos já vinculados a uma tela
const getLinkedGroups = async (req, res) => {
    const { screenId } = req.params;
    try {
        const getLinkedGroups = await App.permission.getLinkedGroups(screenId);
        res.json(getLinkedGroups);
    } catch (error) {
        res.status(500).send('Error fetching linked groups');
    }
};

// Endpoint para vincular grupos a uma tela
const linkGroups = async (req, res) => {
    const { screenId, addedGroups, removedGroups } = req.body;

    console.log(req.body);

    try {
        // Adiciona os grupos vinculados
        if (addedGroups.length > 0) {
            await App.permission.addGroupsToScreen(screenId, addedGroups);
        }

        // Remove os grupos vinculados
        if (removedGroups.length > 0) {
            await App.permission.removeGroupsFromScreen(screenId, removedGroups);
        }

        res.json({ success: true, message: 'Grupos vinculados com sucesso' });
    } catch (error) {
        console.error('Erro ao vincular grupos:', error);
        res.status(500).send('Erro ao vincular grupos');
    }
};


export default {
    getScreens,
    getAllGroups,
    getGroupDetails,
    getAccessByUser,
    updateAccess,
    setSession,
    getSession,
    getAvailableGroups,
    getGroupsData,
    getLinkedGroups,
    linkGroups
};
