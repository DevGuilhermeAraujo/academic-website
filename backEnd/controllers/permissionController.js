import App from '../app.js'; // Atualize o caminho conforme necessário

const getAccessByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const access = await App.permission.getAccessByUser(userId);
        res.json(access);
    } catch (error) {
        res.status(500).send('Error fetching access');
    }
};

const getScreens = async (req, res) => {
    try {
        const screens = await App.screen.getAllScreens();
        res.json(screens);
    } catch (error) {
        res.status(500).send('Error fetching screens');
    }
};

export default {
    getAccessByUser,
    getScreens
}