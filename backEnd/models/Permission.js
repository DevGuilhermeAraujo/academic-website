class Permission {
    constructor(db) {
        this.db = db;
    }

    async getAccessByUser(userId) {
        const sql = `
            SELECT a.*, t.nome, t.rota 
            FROM acessos a
            JOIN telas t ON a.tela_id = t.id
            WHERE a.usuario_id = ?
        `;
        const result = await this.db.executar(sql, [userId]);
        return result.rows;
    }

    async getTelaGrupos() {
        try {
            // 1. Consultar todas as telas
            const telasQuery = App.screen.screen
            const telas = await this.db.query(telasQuery);

            // 2. Consultar todas as vinculações entre grupos e telas
            const gruposTelasQuery = 'SELECT * FROM grupo_telas';
            const gruposTelas = await this.db.query(gruposTelasQuery);

            // 3. Criar um objeto para armazenar as telas e seus grupos associados
            const telaGruposMap = {};

            // 4. Inicializar o objeto com as telas
            telas.forEach(tela => {
                telaGruposMap[tela.id] = []; // Inicia o array de grupos como vazio
            });

            // 5. Preencher o objeto com os grupos associados a cada tela
            gruposTelas.forEach(vinculo => {
                if (telaGruposMap[vinculo.tela_id]) {
                    telaGruposMap[vinculo.tela_id].push(vinculo.grupo_id);
                }
            });

            return telaGruposMap;

        } catch (error) {
            console.error('Erro ao obter telas e grupos:', error);
            throw error;
        }
    }

    
    async getGroupById(ra){
        const sql = 'SELECT * FROM usuarios_grupos WHERE ra_usuario = ?';
        const parametros = [ ra ];
        const result = await this.db.executar(sql, parametros, true);
        return result.rows;
    }

    async updateAccess(userId, screenId, access) {
        const sql = `
            REPLACE INTO acessos (usuario_id, tela_id, pode_visualizar, pode_editar, pode_excluir)
            VALUES (?, ?, ?, ?, ?)
        `;
        const parametros = [userId, screenId, access.pode_visualizar, access.pode_editar, access.pode_excluir];
        await this.db.executar(sql, parametros);
        return { success: true };
    }

    async validateAccess(userId, screenId, permissionType) {
        const sql = `
            SELECT ${permissionType} 
            FROM acessos 
            WHERE usuario_id = ? AND tela_id = ?
        `;
        const result = await this.db.executar(sql, [userId, screenId]);
        if (result.rows.length > 0) {
            return result.rows[0][permissionType] === 1;
        }
        return false;
    }

    // Sessão pode ser gerida em uma classe separada ou mantida aqui conforme necessário
    static SESSION_USER_RA_ID = 'user_ra';
    static SESSION_USERNAME = 'username';
    static SESSION_USER_PERMISSIONS = 'user_permissions';

    static armazenarSessao(req, usuario, permissoes) {
        req.session[Permission.SESSION_USER_RA_ID] = usuario.ra;
        req.session[Permission.SESSION_USERNAME] = usuario.nome;
        req.session[Permission.SESSION_USER_PERMISSIONS] = permissoes;
    }

    static solicitarPermission(req, Permission) {
        const permissoes = req.session[Permission.SESSION_USER_PERMISSIONS] || [];
        return permissoes.includes(Permission);
    }

    static logout(req) {
        if (!req.session) {
            return;
        }

        delete req.session[Permission.SESSION_USER_RA_ID];
        delete req.session[Permission.SESSION_USERNAME];
        delete req.session[Permission.SESSION_USER_PERMISSIONS];
        req.session.destroy();
    }
}

export default Permission;