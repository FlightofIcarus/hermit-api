import { DataTypes, ModelAttributeColumnOptions } from "sequelize";

class Score {

    private id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    private playerId: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    private matchId: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    private pointsMade: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    private pointsConceded: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

    constructor(){}

    public getAttributes() {
        return {
            id: this.id,
            points_made: this.pointsMade,
            points_conceded: this.pointsConceded
        };
    }
};

export { Score };