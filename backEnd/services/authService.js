// server/services/authService.js
const findUserByRA = async (conexao, ra) => {
    const sql = 'SELECT * FROM usuarios WHERE ra = ?';
    const parametros = [ra];
    const result = await conexao.executar(sql, parametros);
    return result.length ? result[0] : null;
};

export default {
    findUserByRA
};
