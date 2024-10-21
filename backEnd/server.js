import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

// Importar as rotas
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js'; // Renomeado e importado as rotas de permissões
import groupRoutes from './routes/groupRoutes.js'; // Importado as rotas de grupos
import sessionRoutes from './routes/sessionRoutes.js'; // Importado as rotas de sessões
import disciplinesRoutes from './routes/disciplinesRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: false
}));

// Usar as rotas importadas
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/class', classRoutes);
app.use('/api/permissions', permissionRoutes); // Usar rotas de permissões
app.use('/api/groups', groupRoutes); // Usar rotas de grupos
app.use('/api/sessions', sessionRoutes); // Usar rotas de sessões
app.use('/api/disciplines', disciplinesRoutes); // Usar rotas de disciplinas

async function inicializarServidor() {
    try {
        //await criptografarSenhas(); // Mantenha esse trecho se necessário para criptografar senhas

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

inicializarServidor();
