import bcrypt from 'bcrypt';
import App from '../app.js'; // Atualize o caminho conforme necessário

const getAllUsers = async (req, res) => {
    try {
        const users = await App.user.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await App.user.findById(id);
        if (response.success) {
            res.json(response.data);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching user');
    }
};

const createUser = async (req, res) => {
    const { ra, nome, cpf, genero, dtNasc, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await App.user.create({ ra, nome, cpf, genero, dtNasc, email, password: hashedPassword });
        // Verificação do resultado da inserção
        if (response && response.success) {
            res.status(200).json({ mensagem: 'Cadastro bem-sucedido', insertId: response.insertId });
        } else {
            // Caso a inserção falhe sem gerar um erro
            res.status(500).json({ mensagem: 'Falha ao criar usuário' });
        }
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        // Resposta de erro para o cliente
        res.status(500).json({ mensagem: 'Erro ao criar usuário' });
    }
};

const updateUser = async (req, res) => {
    const { ra } = req.params;
    const { nome, email, cpf, password } = req.body;

    // Prepare a data object with only the fields that were provided
    const data = {};
    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (password) {
        // Hash the new password if it is provided
        data.password = await bcrypt.hash(password, 10);
    }
    if (cpf) data.cpf = cpf;

    try {
        // Atualiza o usuário e pega a resposta com a mensagem
        const updateResult = await App.user.update(ra, data);

        if (updateResult.success) {
            // Envia a resposta de sucesso com a mensagem
            res.json({ success: true, message: updateResult.message });
        } else {
            // Envia a resposta de falha com a mensagem
            res.status(404).json({ success: false, message: updateResult.message });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        // Envia uma resposta de erro genérica
        res.status(500).json({ success: false, message: 'Erro ao atualizar o usuário.' });
    }
};


const deleteUser = async (req, res) => {
    const { ra } = req.params;
    try {
        const deletedUser = await App.user.delete(ra);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

const getNextRA = async (req, res) => {
    try {
        const sql = 'SELECT MAX(ra) AS proximo_ra FROM usuarios';
        const result = await App.db.executar(sql, [], true); // Passa o fullObject como true
        const proximoRA = (result.rows[0].proximo_ra || 0) + 1; // Se não houver RA, começa de 1
        res.status(200).json({ proximo_ra: proximoRA });
    } catch (error) {
        console.error('Erro ao obter o próximo RA:', error);
        res.status(500).send('Erro no servidor');
    }
};

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getNextRA
};
