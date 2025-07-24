import { Sequelize, Options, Attributes } from "sequelize";


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

