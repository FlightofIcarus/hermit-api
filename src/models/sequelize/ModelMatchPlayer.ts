import { DataTypes, ModelAttributeColumnOptions } from "sequelize";
import { MatchTable, PlayerTable } from "../../config/dbInitialize";

class MatchPlayer {
    private id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }


    getAttributes() {
        return {
            id: this.id,

        }
    }
};

export { MatchPlayer };