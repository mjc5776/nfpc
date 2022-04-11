module.exports = (sequelize, DataTypes) => {

    const CDType = sequelize.define('CDType', {
        CDTypeID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        CDType: {
        type: DataTypes.STRING
        }    
    }, {
        freezeTableName: true
      });


       
    return CDType;
};