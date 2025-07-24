import { DatabaseManager } from "./DatabaseManager";
import path = require("node:path");
import { Match } from "../models/ModelMatch";
import { Player } from "../models/ModelPlayer";
import { Score } from "../models/ModelScore";


const dbPath = path.join(__dirname, "hermitgame.db");
    
const dbInit = () => {
    const mydb = new DatabaseManager({
    dialect: "sqlite",
    storage: dbPath,
    });

    const MatchTable = mydb.defineModels("Match", new Match().getAttributes());
    const PlayerTable = mydb.defineModels("Player", new Player().getAttributes());
    const ScoreTable = mydb.defineModels("Score", new Score().getAttributes());

    MatchTable.belongsTo(PlayerTable);
    PlayerTable.hasMany(MatchTable);
    MatchTable.hasMany(ScoreTable);
    ScoreTable.belongsTo(MatchTable);

    mydb.syncModels();

    return { MatchTable, PlayerTable, ScoreTable };
};

export { dbInit };















// match.destroy({ where: {
//     id: 2
// }});


// match.create({
//     match_name: "Match 1",
//     status: "in_progress",
//     started_at: new Date(),
//     PlayerId: 1
// });

// player.create({
//     name: "Player 1",
//     nickname: "P1",
//     email: "player1@example.com",
//     password: "securepassword",
// });

// score.create({
//     MatchId: 3,
//     player_id: 1,
//     points_made: 10,
//     points_conceded: 5
// });