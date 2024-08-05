import bcrypt from 'bcrypt';
import App from '../app.js';
import authService from '../services/authService.js';
import Permissao from '../models/Permissao.js'; // Adicione esta importação

const login = async (req, res) => {
    const { ra, password } = req.body;

    if (!ra || !password) {
        return res.status(400).send('Por favor, forneça o RA e a senha.');
    }

    try {
        // Utilize App.db em vez de criar uma nova conexão
        const usuario = await authService.findUserByRA(App.db, ra);

        if (!usuario) {
            return res.status(401).send('Credenciais inválidas');
        }

        const passwordCorreta = await bcrypt.compare(password, usuario.password);
        if (passwordCorreta) {
            // Utilize o método de instância carregarPermissoes
            const permissoes = await App.permissao.carregarPermissoes(usuario.ra);
            // Chame o método estático armazenarSessao diretamente da classe Permissao
            Permissao.armazenarSessao(req, usuario, permissoes);
            res.status(200).json({
                mensagem: 'Login bem-sucedido',
                usuario: {
                    ra: usuario.ra,
                    nome: usuario.nome,
                    permissoes: permissoes
                }
            });
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        res.status(500).send('Erro no servidor');
    }
};

export default {
    login
};
