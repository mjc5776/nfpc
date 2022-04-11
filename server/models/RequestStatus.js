module.exports = (sequelize, DataTypes) => {

    const RequestStatus = sequelize.define('RequestStatus', {
        ReqStatusID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        RequestID: {
        type: DataTypes.INTEGER
        },
        RequestStatus: {
            type: DataTypes.INTEGER
        },
        Comments: {
            type: DataTypes.STRING
        },
        UpdateDate: {
            type: DataTypes.DATEONLY
        },
        UpdateBy: {
            type: DataTypes.STRING
        },
        ApproveDate: {
            type: DataTypes.DATEONLY
        }
        
    }, {
        freezeTableName: true
      });
    

       
    return RequestStatus;
};