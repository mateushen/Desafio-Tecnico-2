const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conexão bem-sucedida.');
} catch (error) {
    console.error('Erro ao estabelecer a conexão:', error);
}

module.exports = sequelize;