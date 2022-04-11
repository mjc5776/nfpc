module.exports = (sequelize, DataTypes) => {

    const LeagueYear = sequelize.define('LeagueYear', {
        LeagueYearID: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        StartDate: {
        type: DataTypes.DATEONLY
        },
        EndDate: {
            type: DataTypes.DATEONLY
        },
        Active: {
            type: DataTypes.INTEGER
        },
        LeagueYear: {
            type: DataTypes.INTEGER
            }              
    }, {
        freezeTableName: true
      });


       
    return LeagueYear;
};