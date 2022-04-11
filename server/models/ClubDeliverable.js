module.exports = (sequelize, DataTypes) => {

    const ClubDeliverable = sequelize.define('ClubDeliverable', {
        ClubDeliverID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        RequestID: {
        type: DataTypes.INTEGER
        },
        CDType: {
            type: DataTypes.INTEGER
        },
        FMV: {
            type: DataTypes.DECIMAL
        },
        CDTime: {
            type: DataTypes.STRING
        },
        CDQty: {
            type: DataTypes.INTEGER
        },
        CDComments: {
            type: DataTypes.STRING
        }
        
    }, {
        freezeTableName: true
      });
    

    

    

     

       
    return ClubDeliverable;
};