import { Router } from "express";
import RouterManager from "./RouterManager";
import MatchController from "../controllers/MatchController";
import PlayerController from "../controllers/PlayerController";
import ScoreController from "../controllers/ScoreController";

const router = new RouterManager(Router());

router.setRoute("/matches/opened", "get", MatchController.getOpenedMatchs);

router.setRoute("/matches/:matchid/players/:playerid", "post", MatchController.postOpenedMatch);

router.setRoute("/matches/:matchid/players/:playerid", "delete", MatchController.deleteOpenedMatch);

router.setRoute("/matches", "post", MatchController.postMatch);

router.setRoute("/matches/:matchid", "patch", MatchController.patchMatchStatus);

router.setRoute("/matches", "get", MatchController.getMatchHistory);

router.setRoute("/players", "get", PlayerController.getPlayers);
router.setRoute("/players/:id", "get", PlayerController.getPlayers);
router.setRoute("/players", "post", PlayerController.createPlayer);
router.setRoute("/players/:id", "put", PlayerController.updatePlayer);
router.setRoute("/players/:id", "delete", PlayerController.deletePlayer);

router.setRoute("/scores", "post", ScoreController.postScore);

export { router };