module.exports = (sequelize, DataTypes) => {

    const Request = sequelize.define('Request', {
        RequestID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        PlayerID: {
            type: DataTypes.INTEGER
        },
        LeagueYearID: {
            type: DataTypes.INTEGER
            },
        RequestDate: {
            type: DataTypes.DATEONLY
        },
        RequestUser: {
            type: DataTypes.STRING
        },
        RequestUserEmail: {
            type: DataTypes.STRING
        },
        RequestTitle: {
            type: DataTypes.STRING
        },
        ReqDescription: {
            type: DataTypes.STRING
        },
        Status: {
            type: DataTypes.STRING
        },
        ApprovedBy: {
            type: DataTypes.STRING
        },
        Contract: {
            type: DataTypes.INTEGER
        },
        AcctNum: {
            type: DataTypes.STRING
        }
        
    }, {
        freezeTableName: true
      });
    

       
    return Request;
};