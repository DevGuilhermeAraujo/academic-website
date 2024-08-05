import App from '../app.js'; // Ajuste no caminho de importação
import bcrypt from 'bcrypt';

// Função para criptografar senhas dos usuários
async function criptografarSenhas() {
    try {
        // Selecionar todos os usuários que têm senhas não criptografadas
        const sql = 'SELECT * FROM usuarios WHERE senha IS NOT NULL AND senha NOT LIKE \'$2b$%\'';
        const usuarios = await App.db.executar(sql);

        // Para cada usuário, hash a senha e atualize no banco de dados
        for (const usuario of usuarios) {
            const senhaHash = await bcrypt.hash(usuario.senha, 10); // Hash da senha com salt de 10 rounds
            const updateSql = 'UPDATE usuarios SET senha = $1 WHERE ra = $2';
            const parametros = [senhaHash, usuario.ra];
            await App.db.executar(updateSql, parametros);
        }

        console.log('Senhas criptografadas com sucesso.');
    } catch (error) {
        console.error('Erro ao criptografar senhas:', error);
    }
}

export default criptografarSenhas;
