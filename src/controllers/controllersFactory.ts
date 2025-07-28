import { MatchTable, PlayerTable, ScoreTable } from "../config/dbInitialize";
import { MatchRepository } from "../repositories/MatchRepository";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { MatchService } from "../services/MatchService";
import { PlayerService } from "../services/PlayerService";
import { ScoreService } from "../services/ScoreService";
import MatchController from "./MatchController";
import PlayerController from "./PlayerController";
import ScoreController from "./ScoreController";

const controllersFactory = () => {
const playerRepository = new PlayerRepository(PlayerTable);
const playerService = new PlayerService(playerRepository);
const playerController = new PlayerController(playerService);

const scoreRepository = new ScoreRepository(ScoreTable);
const scoreService = new ScoreService(scoreRepository);
const scoreController = new ScoreController(scoreService);

const matchRepository = new MatchRepository(MatchTable);    
const matchService = new MatchService(matchRepository, playerRepository);
const matchController = new MatchController(matchService);

return { playerController, scoreController, matchController };

};

export { controllersFactory };