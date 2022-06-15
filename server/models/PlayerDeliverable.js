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
            type: DataTypes.STRING
        },
        PDTime: {
            type: DataTypes.INTEGER
        },
        PDQty: {
            type: DataTypes.STRING
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