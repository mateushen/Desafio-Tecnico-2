const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'GGfc3fFFf45aEg4EA5-g2AgDECBFCfBB', {
    host: 'roundhouse.proxy.rlwy.net',
    port: 46998,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conexão bem-sucedida.');
} catch (error) {
    console.error('Erro ao estabelecer a conexão:', error);
}

module.exports = sequelize;
