import { DatabaseManager } from "./DatabaseManager";
import path = require("node:path");
import { Match } from "../models/sequelize/ModelMatch";
import { Player } from "../models/sequelize/ModelPlayer";
import { Score } from "../models/sequelize/ModelScore";
import { MatchPlayer } from "../models/sequelize/ModelMatchPlayer";

const dirname = path.resolve(__dirname, "..", "db");

const dbPath = path.join(dirname, "hermitgame.db");
    
const mydb = new DatabaseManager({
dialect: "sqlite",
storage: dbPath,
});

const MatchTable = mydb.defineModels("Match", new Match().getAttributes());
const PlayerTable = mydb.defineModels("Player", new Player().getAttributes());
const ScoreTable = mydb.defineModels("Score", new Score().getAttributes());
const MatchPlayerTable = mydb.defineModels("MatchPlayer", new MatchPlayer().getAttributes());

PlayerTable.belongsToMany(MatchTable, { through: MatchPlayerTable, as: "matches",
    foreignKey: "PlayerId",
 });
MatchTable.belongsToMany(PlayerTable, { through: MatchPlayerTable, as: "players",
    foreignKey: "MatchId",
 });

MatchTable.hasMany(ScoreTable, {
    foreignKey: "MatchId",
});
PlayerTable.hasMany(ScoreTable, {
    foreignKey: "PlayerId",});


export { MatchTable, PlayerTable, ScoreTable, MatchPlayerTable, mydb };