import Conexao from './utils/Conexao.js';
import User from './models/User.js';
import Permission from './models/Permission.js';
import Class from './models/Class.js';
import Group from './models/Group.js';
import Screen from './models/Screen.js';
import Disciplines from './models/Disciplines.js';

class App {
    static db;
    static user;
    static permission;
    static class;
    static group;
    static screen;
    static disciplines;

    static async init() {
        App.db = new Conexao();
        //await App.db.conectar(); // Certifique-se de que a conexão está sendo estabelecida
        App.user = new User(App.db);
        App.permission = new Permission(App.db); // Cria uma instância com o banco de dados
        App.class = new Class(App.db);
        App.group = new Group(App.db);
        App.screen = new Screen(App.db);
        App.disciplines = new Disciplines(App.db);
    }
}

// Inicializa o aplicativo
await App.init();

export default App;
