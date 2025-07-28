import { DataTypes, ModelAttributeColumnOptions } from "sequelize";

class Player {

    private id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    private name: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private nickname: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private email: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private password: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private matchesPlayed: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    private matchesWon: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    private matchesLost: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    private inGame: ModelAttributeColumnOptions = {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

    constructor(){}

    public getAttributes() {
        return {
            id: this.id,
            name: this.name,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            matches_played: this.matchesPlayed,
            matches_won: this.matchesWon,
            matches_lost: this.matchesLost,
            in_game: this.inGame
        };
    }
};

export { Player };