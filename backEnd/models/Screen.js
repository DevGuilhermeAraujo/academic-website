class Screen {
    constructor(db) {
        this.db = db;
    }

    async getAllScreens() {
        const sql = 'SELECT * FROM telas';
        const result = await this.db.executar(sql, [], true);
        return result.rows;
    }

    async getAvailableGroups(screenId) {
        const allGroupsQuery = 'SELECT * FROM grupos';
        const allGroupsResult = await this.db.executar(allGroupsQuery, [], true);
        const allGroups = allGroupsResult.rows;

        const linkedGroupsQuery = 'SELECT grupo_id FROM permissoes_telas WHERE tela_id = ?';
        const linkedGroupsResult = await this.db.executar(linkedGroupsQuery, [screenId], true);
        const linkedGroups = linkedGroupsResult.rows;

        const linkedGroupIds = linkedGroups.map(group => group.grupo_id);
        return allGroups.filter(group => !linkedGroupIds.includes(group.id));
    }

    async getLinkedGroups(screenId) {
        const sql = `
            SELECT g.*
            FROM grupos g
            JOIN permissoes_telas pt ON g.id = pt.grupo_id
            WHERE pt.tela_id = ?
        `;
        const result = await this.db.executar(sql, [screenId], true);
        return result.rows;
    }

    async addGroupsToScreen(screenId, groupIds) {
        const sql = 'INSERT INTO permissoes_telas (tela_id, grupo_id) VALUES (?, ?)';

        for (const groupId of groupIds) {
            await this.db.executar(sql, [screenId, groupId]);
        }

        return { success: true };
    }

    async removeGroupsFromScreen(screenId, groupIds) {
        const sql = 'DELETE FROM permissoes_telas WHERE tela_id = ? AND grupo_id = ?';

        for (const groupId of groupIds) {
            await this.db.executar(sql, [screenId, groupId]);
        }

        return { success: true };
    }
}

export default Screen;