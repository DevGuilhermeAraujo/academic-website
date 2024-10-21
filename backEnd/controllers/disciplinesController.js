import App from '../app.js'; // Atualize o caminho conforme necessário


// Função usada para pegar todos os grupos registrados no banco de dados
const getAllDisciplines = async (req, res) => {
    try {
        const groups = await App.disciplines.getAllDisciplines();
        res.json(groups);
    } catch (error) {
        res.status(500).send('Error fetching groups');
    }
};

const getDisciplinesDetails = async (req, res) => {
    const { groupId } = req.params;
    try {
        // Chama as funções para obter telas e usuários
        const groupScreensResponse = await App.group.getGroupScreens(groupId);
        const groupUsersResponse = await App.group.getGroupUsers(groupId);

        // Verifica se a resposta foi bem-sucedida
        if (!groupScreensResponse.success || !groupUsersResponse.success) {
            return res.status(500).send('Error fetching group details');
        }

        // Extrai os dados dos resultados
        const groupScreens = groupScreensResponse.result || [];
        const groupUsers = groupUsersResponse.result || [];

        // Verifica se os dados foram retornados corretamente
        if (!Array.isArray(groupScreens) || !Array.isArray(groupUsers)) {
            return res.status(500).send('Error processing group details');
        }

        // Estrutura os dados no formato desejado
        const result = [
            groupScreens.map(screen => ({
                id: screen.screenId,
                nome: screen.screenName
            })),
            groupUsers.map(user => ({
                id: user.userId,
                nome: user.userName
            }))
        ];

        // Envia a resposta como JSON
        res.json(result);
    } catch (error) {
        console.error('Erro ao buscar detalhes do grupo:', error);
        res.status(500).send('Error fetching group details');
    }
};

const createDisciplines = async (req, res) => {
    const { nome} = req.body;
    try {
        const response = await App.disciplines.createDisciplines({ nome});
        if (response && response.success) {
            res.status(200).json({ mensagem: 'Disciplines created successfully', insertId: response.insertId });
        } else {
            res.status(500).json({ mensagem: 'Failed to create Disciplines' });
        }
    } catch (error) {
        console.error('Error creating Disciplines:', error);
        res.status(500).json({ mensagem: 'Error creating Disciplines' });
    }
}



export default {
    getAllDisciplines,
    getDisciplinesDetails,
    createDisciplines
}