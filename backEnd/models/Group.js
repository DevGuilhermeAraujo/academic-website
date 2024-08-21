class Group {
    constructor(db) {
        this.db = db;
    }

    async getAllGroups() {
        const sql = 'SELECT * FROM grupos';
        const result = await this.db.executar(sql, [], true);
        return result.rows;
    }

    async addGroup(name) {
        const sql = 'INSERT INTO grupos (nome) VALUES (?)';
        await this.db.executar(sql, [name]);
        return { success: true };
    }

    async deleteGroup(groupId) {
        const sql = 'DELETE FROM grupos WHERE id = ?';
        await this.db.executar(sql, [groupId]);
        return { success: true };
    }

    async updateGroup(groupId) {
        const sql = 'DELETE FROM grupos WHERE id = ?';
        await this.db.executar(sql, [groupId]);
        return { success: true };
    }

    async getGroupScreens(groupId) {
        // SQL para obter detalhes do grupo, incluindo telas e usuários associados
        const sql = `
            SELECT
                t.id AS screenId,
                t.nome AS screenName
            FROM grupos g
            LEFT JOIN permissoes_telas pt ON g.id = pt.grupo_id
            LEFT JOIN telas t ON pt.tela_id = t.id
            WHERE g.id = ?
        `;

        const result = await this.db.executar(sql, [groupId]); // Usando a função `executar` da sua classe de conexão

        return { result, success: true };
    }

    async getGroupUsers(groupId) {
        const sql = `
            SELECT
                u.ra AS userId,
                u.nome AS userName
            FROM grupos g
            LEFT JOIN usuarios_grupos ug ON g.id = ug.grupo_id
            LEFT JOIN usuarios u ON ug.ra_usuario = u.ra
            WHERE g.id = ?
        `;
        const result = await this.db.executar(sql, [groupId]); // Usando a função `executar` da sua classe de conexão

        return { result, success: true };
    }
    
}

export default Group;