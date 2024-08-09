import App from '../app.js'; // Atualize o caminho conforme necessário

const getAllClasses = async (req, res) => {
    try {
        const classes = await App.class.findAll();
        res.json(classes);
    } catch (error) {
        res.status(500).send('Error fetching classes');
    }
};

const getClassById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await App.class.findById(id);
        if (response.success) {
            res.json(response.data);
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching class');
    }
};

const createClass = async (req, res) => {
    const { nome, descricao, professor_id } = req.body;
    try {
        const response = await App.class.createClass({ nome, descricao, professor_id });
        if (response && response.success) {
            res.status(200).json({ mensagem: 'Class created successfully', insertId: response.insertId });
        } else {
            res.status(500).json({ mensagem: 'Failed to create class' });
        }
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).json({ mensagem: 'Error creating class' });
    }
};

const updateClass = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, professor_id } = req.body;

    // Prepare a data object with only the fields that were provided
    const data = {};
    if (nome) data.nome = nome;
    if (descricao) data.descricao = descricao;
    if (professor_id) data.professor_id = professor_id;

    try {
        const updateResult = await App.class.update(id, data);
        if (updateResult.success) {
            res.json({ success: true, message: updateResult.message });
        } else {
            res.status(404).json({ success: false, message: updateResult.message });
        }
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ success: false, message: 'Error updating class.' });
    }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClass = await App.class.delete(id);
        if (deletedClass) {
            res.json(deletedClass);
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting class');
    }
};

export default {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
};
