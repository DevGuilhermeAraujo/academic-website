class Class {
    constructor(db) {
        this.db = db; // Conexão com o banco de dados passada para a instância
    }

    async findAll() {
        const sql = `SELECT id, nome FROM classes`;
        const result = await this.db.executar(sql, [], true); // Usa this.db
        return result.rows;
    }

    async findById(id) {
        const sql = `SELECT * FROM classes WHERE id = ?`;
        const result = await this.db.executar(sql, [id], true); // Usa this.db
        return { data: result.rows, success: true, message: 'Class not found.' };
    }

    async createClass(data) {
        const sql = 'INSERT INTO classes (nome) VALUES (?)';
        const parametros = [
            data.nome ?? null
        ];

        const result = await this.db.executar(sql, parametros);
        return { success: true, insertId: result.insertId };
    }

    async update(id, data) {
        // Construir a cláusula SET dinamicamente
        const fields = Object.keys(data);
        const values = Object.values(data);
    
        if (fields.length === 0) {
            throw new Error('No fields provided for update');
        }
    
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        const sql = `UPDATE classes SET ${setClause} WHERE id = ?`;
 
        values.push(id);
        const parametros = values;
    
        try {
            const result = await this.db.executar(sql, parametros); // Usa this.db
            if (result.affectedRows > 0) {
                return { success: true, message: 'Update successful!' };
            } else {
                return { success: false, message: 'Class not found.' };
            }
        } catch (error) {
            console.error('Error updating class in database:', error);
            throw error;
        }
    }

    async delete(id) {
        const sql = 'DELETE FROM classes WHERE id = ?';
        const parametros = [id];
        const result = await this.db.executar(sql, parametros); // Usa this.db
        if (result.affectedRows > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Class not found.' };
        }
    }
}

export default Class;
