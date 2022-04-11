module.exports = (sequelize, DataTypes) => {

    const Player = sequelize.define('Player', {
        PlayerID: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        FirstName: {
        type: DataTypes.STRING
        },
        LastName: {
            type: DataTypes.STRING
        },
        MiddleName: {
            type: DataTypes.STRING
        },
        NFLExperience: {
            type: DataTypes.INTEGER
        },
        EntryYear: {
            type: DataTypes.INTEGER
        },
        RookieYear: {
            type: DataTypes.INTEGER
        },
        DraftClub: {
            type: DataTypes.STRING
        },
        EntryClub: {
            type: DataTypes.STRING
        },
        CurrentClub: {
            type: DataTypes.STRING
        },
        LastContractYear: {
            type: DataTypes.INTEGER
        },
        ContractSignYear: {
            type: DataTypes.INTEGER
        },
        PracticeSquadCredit: {
            type: DataTypes.INTEGER
        },
        FirstContractYear: {
            type: DataTypes.INTEGER
        },
        SigningType: {
            type: DataTypes.STRING
        },
        Archive: {
            type: DataTypes.INTEGER
        },
        Position: {
            type: DataTypes.STRING
        },
        JerseyNum: {
            type: DataTypes.INTEGER
        },
        PlayerStatus: {
            type: DataTypes.INTEGER
        }
        
    }, {
        freezeTableName: true
      });
    
    

   

    
    return Player;
};