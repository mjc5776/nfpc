module.exports = (sequelize, DataTypes) => {

    const PlayerDeliverable = sequelize.define('PlayerDeliverable', {
        PlayerDeliverID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        RequestID: {
        type: DataTypes.INTEGER
        },
        PDType: {
            type: DataTypes.INTEGER
        },
        PDTime: {
            type: DataTypes.TIME
        },
        PDQty: {
            type: DataTypes.INTEGER
        },
        PDDate: {
            type: DataTypes.DATEONLY
        },
        PDLocation: {
            type: DataTypes.STRING
        },
        PDComments: {
            type: DataTypes.STRING
        }
        
    }, {
        freezeTableName: true
      });
    

       
    return PlayerDeliverable;
};