import App from '../app.js'; // Atualize o caminho conforme necessário

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

export default {
    updateAccess
};
