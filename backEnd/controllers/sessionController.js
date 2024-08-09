import App from '../app.js'; // Atualize o caminho conforme necessário

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

export default {
    setSession,
    getSession
}