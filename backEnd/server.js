import express from 'express';
import session from 'express-session';
import criptografarSenhas from './services/criptografarSenhas.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: 'seu_segredo_aqui',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/class', classRoutes)

async function inicializarServidor() {
    try {
        //await criptografarSenhas();

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
}

inicializarServidor();
