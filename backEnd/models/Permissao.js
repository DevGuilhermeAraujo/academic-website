class Permissao {
    constructor(db) {
        this.db = db;
        this.sessao = {}; // Objeto para armazenar variáveis de sessão
    }

    // Função para definir variáveis de sessão
    setSessao(usuarioId, dados) {
        this.sessao[usuarioId] = {
            nome: dados.nome,
            ra: dados.ra,
            email: dados.email,
            // Adicione outras variáveis conforme necessário
        };
    }

    // Função para obter variáveis de sessão
    getSessao(usuarioId) {
        return this.sessao[usuarioId];
    }

    async getAllScreens() {
        const sql = 'SELECT * FROM telas';
        const result = await this.db.executar(sql, [], true);
        return result.rows;
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

    async getAvailableGroups(screenId) {
        try {
            // Obter todos os grupos
            const allGroupsQuery = 'SELECT * FROM grupos';
            const allGroupsResult = await this.db.executar(allGroupsQuery, [], true);
            const allGroups = allGroupsResult.rows;

            // Obter grupos vinculados à tela específica
            const linkedGroupsQuery = 'SELECT grupo_id FROM permissoes_telas WHERE tela_id = ?';
            const linkedGroupsResult = await this.db.executar(linkedGroupsQuery, [screenId], true);
            const linkedGroups = linkedGroupsResult.rows;

            // Converter o resultado dos grupos vinculados em um array de IDs
            const linkedGroupIds = linkedGroups.map(group => group.grupo_id);

            // Filtrar os grupos disponíveis
            const availableGroups = allGroups.filter(group => !linkedGroupIds.includes(group.id));

            return availableGroups;
        } catch (error) {
            console.error('Erro ao obter grupos disponíveis:', error);
            throw new Error('Erro ao obter grupos disponíveis');
        }
    }

    async getLinkedGroups(screenId) {
        try {
            const sql = `
                SELECT g.*
                FROM grupos g
                JOIN permissoes_telas pt ON g.id = pt.grupo_id
                WHERE pt.tela_id = ?
            `;
            const result = await this.db.executar(sql, [screenId], true);
            return result.rows;
        } catch (error) {
            console.error('Erro ao obter grupos vinculados:', error);
            throw new Error('Erro ao obter grupos vinculados');
        }
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

    async getAllGroups() {
        const sql = 'SELECT * FROM grupos';
        const result = await this.db.executar(sql, [], true);
        return result.rows;
    }

    async addGroupsToScreen(screenId, groupIds) {
        const sql = 'INSERT INTO permissoes_telas (tela_id, grupo_id) VALUES (?, ?)';

        try {
            for (const groupId of groupIds) {
                const parametros = [screenId ?? null, groupId ?? null];
                const result = await this.db.executar(sql, parametros);

                if (!result) {
                    throw new Error('Falha ao inserir o grupo: ' + groupId);
                }
            }

            return { success: true };
        } catch (error) {
            console.error('Erro ao adicionar grupos à tela:', error);
            return { success: false, message: error.message };
        }
    }

    async removeGroupsFromScreen(screenId, groupId) {
        const sql = 'DELETE FROM permissoes_telas WHERE tela_id = ? AND grupo_id = ?';
        await this.db.executar(sql, [screenId, groupId]);
        return { success: true };
    }

    static SESSION_USER_RA_ID = 'user_ra';
    static SESSION_USERNAME = 'username';
    static SESSION_USER_PERMISSIONS = 'user_permissions';

    async carregarPermissoes(usuarioId) {
        const sql = `
                SELECT p.descricao
                FROM permissoes p
                JOIN usuario_permissoes up ON p.id = up.permissao_id
                WHERE up.usuario_ra = ?`;
        const parametros = [usuarioId];

        await this.db.conectar();
        const result = await this.db.executar(sql, parametros);
        return result.map(row => row.descricao);
    }

    async carregarPermissoesTelas(usuarioId) {
        const sql = `
                SELECT t.id, t.nome, t.rota
                FROM permissoes_telas pt
                JOIN telas t ON pt.tela_id = t.id
                JOIN grupos g ON pt.grupo_id = g.id
                JOIN usuario_grupos ug ON g.id = ug.grupo_id
                WHERE ug.usuario_ra = ?`;
        const parametros = [usuarioId];

        await this.db.conectar();
        const result = await this.db.executar(sql, parametros);
        return result;
    }

    static solicitarPermissao(req, permissao) {
        const permissoes = req.session[Permissao.SESSION_USER_PERMISSIONS] || [];
        return permissoes.includes(permissao);
    }

    static armazenarSessao(req, usuario, permissoes) {
        req.session[Permissao.SESSION_USER_RA_ID] = usuario.ra;
        req.session[Permissao.SESSION_USERNAME] = usuario.nome;
        req.session[Permissao.SESSION_USER_PERMISSIONS] = permissoes;
    }

    static logout(req) {
        if (!req.session) {
            return;
        }

        delete req.session[Permissao.SESSION_USER_RA_ID];
        delete req.session[Permissao.SESSION_USERNAME];
        delete req.session[Permissao.SESSION_USER_PERMISSIONS];
        req.session.destroy();
    }
}

export default Permissao;
