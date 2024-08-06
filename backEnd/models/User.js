class User {
    constructor(db) {
        this.db = db; // Conexão com o banco de dados passada para a instância
    }

    async findAll() {
        const sql = `SELECT ra, nome, cpf, CASE WHEN genero = 1 THEN 'Masculino'
                                                WHEN genero = 2 THEN 'Feminino'
                                                ELSE 'Outro'
                                                END AS genero, 
                            DATE_FORMAT(dt_NASC, '%d/%m/%Y') AS dt_NASC, email, DATE_FORMAT(dt_registro, '%d/%m/%Y') AS dt_registro 
                    FROM usuarios
    `;
        const result = await this.db.executar(sql, [], true); // Usa this.db
        return result.rows;
    }

    async findById(ra) {
        const sql = `SELECT * FROM usuarios WHERE ra = ?`;
        const result = await this.db.executar(sql, [ra], true); // Usa this.db
        return { data: result.rows, success: true, message: 'Usuário não encontrado.' };
    }

    async create(data) {
        const sql = 'INSERT INTO usuarios (ra, nome, cpf, genero, dt_NASC, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const parametros = [
            data.ra ?? null,
            data.nome ?? null,
            data.cpf ?? null,
            data.genero ?? null,
            data.dtNasc ?? null,
            data.email ?? null,
            data.password ?? null
        ];

        const result = await this.db.executar(sql, parametros);
        return { success: true, insertId: result.insertId };
    }

    async update(ra, data) {
        // Construir a cláusula SET dinamicamente
        const fields = Object.keys(data);
        const values = Object.values(data);
    
        if (fields.length === 0) {
            throw new Error('No fields provided for update');
        }
    
        const setClause = fields.map((field) => `${field} = ?`).join(", ");
        const sql = `UPDATE usuarios SET ${setClause} WHERE ra = ?`;
 
        values.push(ra);
        const parametros = values;
    
        try {
            const result = await this.db.executar(sql, parametros); // Usa this.db
            if (result.affectedRows > 0) {
                return { success: true, message: 'As alterações foram realizadas com sucesso!' };
            } else {
                return { success: false, message: 'Usuário não encontrado.' };
            }
        } catch (error) {
            console.error('Error updating user in database:', error);
            throw error;
        }
    }

    async delete(ra) {
        const sql = 'DELETE FROM usuarios WHERE ra = ?';
        const parametros = [ra];
        const result = await this.db.executar(sql, parametros); // Usa this.db
        if (result.affectedRows > 0) {
            return { success: true };
        } else {
            return { success: false, message: 'Usuário não encontrado.' };
        }
    }
    
}

export default User;
