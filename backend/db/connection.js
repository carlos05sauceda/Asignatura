const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'universidad',
    'root',
    'ElmoThor1998',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(() => console.log('Conexion con BD establecida'))
    .catch((error) => console.log("Error de conexion " + error))

module.exports = sequelize;