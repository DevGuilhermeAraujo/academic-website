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
}

export default Group;