// backEnd/controllers/dashboardController.js
import express from 'express';
import App from '../app.js';

const router = express.Router();

// Rota para obter todas as informações do dashboard
router.get('/', async (req, res) => {

    try {
        const sqlAlunos = 'SELECT COUNT(*) AS total_alunos FROM alunos';
        const resultAlunos = await App.db.executar(sqlAlunos);
        const totalAlunos = resultAlunos.length > 0 ? resultAlunos[0].total_alunos : 0;

        // const sqlProfessores = 'SELECT COUNT(*) AS total_professores FROM professores';
        // const resultProfessores = await App.db.executar(sqlProfessores);
        // const totalProfessores = resultProfessores.length > 0 ? resultProfessores[0].total_professores : 0;

        // const sqlTurmas = 'SELECT COUNT(*) AS total_turmas FROM turmas';
        // const resultTurmas = await App.db.executar(sqlTurmas);
        // const totalTurmas = resultTurmas.length > 0 ? resultTurmas[0].total_turmas : 0;

        res.status(200).json({
            totalAlunos
            //totalProfessores,
            //totalTurmas
        });
    } catch (error) {
        console.error('Erro ao buscar informações do dashboard:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
