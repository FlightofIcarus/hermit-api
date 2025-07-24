import { Sequelize, Options, Attributes } from "sequelize";
// import path = require("node:path");
// import { Match } from "../models/ModelMatch";
// import { Player } from "../models/ModelPlayer";
// import { Score } from "../models/ModelScore";

type DbDialect = "mysql" | "sqlite" | "postgres" | "mariadb";

type SequelizeOptions = Options & {
    dialect: DbDialect;
    storage?: string;
};

class DatabaseManager {

    private sequelize: Sequelize;
    constructor(
        private options: SequelizeOptions,
        ) { this.sequelize = new Sequelize(options); }

    public defineModels(modelName: string, model: Attributes<any>) {
        return this.sequelize.define(modelName, model)
    }
    
    public syncModels() {
        this.sequelize.sync()
            .then(() => console.log("Database synchronized successfully."))
            .catch((error) => console.error("Error synchronizing database:", error));
    }
  
};

export { DatabaseManager };

// const dbPath = path.join(__dirname, "hermitgame.db");


    
// const mydb = new DatabaseManager({
// dialect: "sqlite",
// storage: dbPath,
// });

// const match = mydb.defineModels("Match", new Match().getAttributes());
// const player = mydb.defineModels("Player", new Player().getAttributes());
// const score = mydb.defineModels("Score", new Score().getAttributes());

// match.belongsTo(player);
// player.hasMany(match);
// match.hasMany(score);
// score.belongsTo(match);

// mydb.syncModels();

// export { match, player, score };