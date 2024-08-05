import mysql from 'mysql2/promise';

class Conexao {
    constructor() {
        this.host = 'localhost';
        this.port = '3306';
        this.user = 'root';
        this.password = '';
        this.database = 'escola_db';
        this.connection = null;

        // Chama o método conectar automaticamente ao instanciar a classe
        this.conectar();
    }

    async conectar() {
        try {
            if (!this.connection) {
                this.connection = await mysql.createConnection({
                    host: this.host,
                    port: this.port,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });
                console.log('Conexão estabelecida com o banco de dados MySQL.');
            }
        } catch (error) {
            console.error('Erro na conexão:', error.message);
            throw error;
        }
    }

    async desconectar() {
        try {
            if (this.connection) {
                await this.connection.end(); // Fecha a conexão com o banco de dados
                console.log('Conexão encerrada com o banco de dados MySQL.');
            }
        } catch (error) {
            console.error('Erro ao desconectar do banco de dados:', error);
            throw error; // Lança o erro para ser tratado externamente, se necessário
        }
    }

    async executar(sql, parametros = [], fullObject = false, autoExec = true) {
        try {
            const [rows, fields] = await this.connection.execute(sql, parametros);
            if (fullObject) {
                return { rows, fields };
            } else {
                return rows;
            }
        } catch (error) {
            console.error('Erro ao executar a query:', error.message);
            throw error;
        }
    }

    async lastInsertId() {
        // Implementação do lastInsertId para MySQL
        throw new Error('Método lastInsertId não implementado para MySQL.');
    }

    async errorCode() {
        // Implementação do errorCode para MySQL
        throw new Error('Método errorCode não implementado para MySQL.');
    }

    async errorInfo() {
        // Implementação do errorInfo para MySQL
        throw new Error('Método errorInfo não implementado para MySQL.');
    }
}

export default Conexao;
