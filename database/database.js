const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'Walisson_PS07*', {
    host: 'localhost',
    dialect: 'mysql'
});

connection.authenticate().then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});

module.exports = connection;
