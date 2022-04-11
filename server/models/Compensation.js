module.exports = (sequelize, DataTypes) => {

    const Compensation = sequelize.define('Compensation', {
        CompensationID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        RequestID: {
        type: DataTypes.INTEGER
        },
        PlayerID: {
            type: DataTypes.INTEGER
        },
        LeagueYearID: {
            type: DataTypes.INTEGER
        },
        Compensation: {
            type: DataTypes.STRING
        },
        CompValue: {
            type: DataTypes.DECIMAL
        },
        CompDate: {
            type: DataTypes.DATEONLY
        },
        ChkNbr: {
            type: DataTypes.INTEGER
        }
        
    }, {
        freezeTableName: true
      });
    

    

    

     

       
    return Compensation;
};