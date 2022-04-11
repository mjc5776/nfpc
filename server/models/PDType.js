module.exports = (sequelize, DataTypes) => {

    const PDType = sequelize.define('PDType', {
        PDTypeID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        PDType: {
        type: DataTypes.STRING
        }    
    }, {
        freezeTableName: true
      });


       
    return PDType;
};