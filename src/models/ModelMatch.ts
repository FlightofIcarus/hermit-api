import { DataTypes, ModelAttributeColumnOptions  } from "sequelize";

class Match {

    private id: ModelAttributeColumnOptions = {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    private matchName: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private status: ModelAttributeColumnOptions = {
        type: DataTypes.STRING,
        allowNull: false
    }
    private startedAt: ModelAttributeColumnOptions = {
        type: DataTypes.DATE,
        allowNull: false
    }

    constructor(){}

    public getAttributes() {
        return {
            id: this.id,
            match_name: this.matchName,
            status: this.status,
            started_at: this.startedAt
        };
    }
};

export { Match };

