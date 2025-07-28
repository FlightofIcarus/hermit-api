import { Router } from "express";
import RouterManager from "./RouterManager";
import { controllersFactory } from "../controllers/controllersFactory";

const router = new RouterManager(Router());


const { playerController, scoreController, matchController } = controllersFactory();


router.setRoute("/matches/opened", "get", matchController.getOpenedMatchs);
router.setRoute("/matches/:matchid/players/:playerid", "post", matchController.postOpenedMatch);
router.setRoute("/matches/:matchid/players/:playerid", "delete", matchController.deleteOpenedMatch);
router.setRoute("/matches", "post", matchController.postMatch);
router.setRoute("/matches/:matchid", "patch", matchController.patchMatchStatus);
router.setRoute("/matches", "get", matchController.getMatchHistory);

router.setRoute("/players", "get", playerController.getPlayers);
router.setRoute("/players/:id", "get", playerController.getPlayers);
router.setRoute("/players", "post", playerController.createPlayer);
router.setRoute("/players/:id", "put", playerController.updatePlayer);
router.setRoute("/players/:id", "delete", playerController.deletePlayer);

router.setRoute("/scores", "post", scoreController.postScore);

export { router };