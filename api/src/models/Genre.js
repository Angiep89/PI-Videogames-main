const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genre', {
        name: {
             type: DataTypes.STRING,
             allowNull: false,
        }
    },{timeStamps: false,
        createdAt: false, // don't add createdAt attribute
        updatedAt: false})
}