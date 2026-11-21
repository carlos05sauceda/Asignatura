const { DataTypes } = require('sequelize')
const sequelize = require('../db/connection')

const Asignatura = sequelize.define('Asignatura', {
    idAsignatura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
    idEstudiante: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'Asignatura',
    timestamps: false
})

module.exports = Asignatura