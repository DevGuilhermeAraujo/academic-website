class Permissao {
    static SESSION_USER_RA_ID = 'user_ra';
    static SESSION_USERNAME = 'username';
    static SESSION_USER_PERMISSIONS = 'user_permissions';

    constructor(db) {
        this.db = db; // Conexão com o banco de dados passada para a instância
    }

    async carregarPermissoes(usuarioId) {
        const sql = `
            SELECT p.descricao
            FROM permissoes p
            JOIN usuario_permissoes up ON p.id = up.permissao_id
            WHERE up.usuario_ra = ?`;
        const parametros = [usuarioId];

        await this.db.conectar(); // Conecta ao banco de dados
        const result = await this.db.executar(sql, parametros);
        return result.map(row => row.descricao);
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
