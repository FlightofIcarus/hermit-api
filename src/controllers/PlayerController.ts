import { Request, Response } from "express";
import { PlayerService } from "../services/PlayerService";
import { playerInputValidator } from "../validators/PlayersValidators";

class PlayerController {

  constructor(private playerService: PlayerService) {}

  /**
   * @swagger
   * /players:
   *  post:
   *    summary: Create a new player
   *    description: Create a new player
   *    tags:
   *      - Players
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: integer
   *                description: The player ID
   *              name:
   *                type: string
   *                description: The player name
   *              nickname:
   *                type: string
   *                description: The player nickname
   *              email:
   *                type: string
   *                description: The player email
   *    responses:
   *      201:
   *        description: Player created successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *                  description: A success message
   *                player:
   *                  type: object
   *                  description: The created player
   *                  properties:
   *                    id:
   *                      type: integer
   *                      description: The player ID
   *                    name:
   *                      type: string
   *                      description: The player name
   *                    nickname:
   *                      type: string
   *                      description: The player nickname
   *                    email:
   *                      type: string
   *                      description: The player email
   *
   */
  createPlayer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const playerData = await req.body;
      playerInputValidator(playerData);
      const response = await this.playerService.createPlayer(playerData);
      return res.status(201).json({ message: "Player created successfully", player: response });
    } catch (error) {
      if (error instanceof Error) {
    return res.status(400).json( {error: error.message} );}
  }
  return res.status(400).json({ error: "An unknown error occurred." });

  };

  /**
   * @swagger
   * /players:
   *  get:
   *    summary: Retrieve the players list
   *    description: Retrieve the players list if without ID, or a specific player by ID
   *    tags:
   *      - Players
   *    parameters:
   *      - in: path
   *        name: id
   *        required: false
   *        schema:
   *          type: string
   *          description: The player ID
   *    responses:
   *      200:
   *        description: Players list retrieved successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                player:
   *                  type: object
   *                  description: The created player
   *                  properties:
   *                    id:
   *                      type: integer
   *                      description: The player ID
   *                    name:
   *                      type: string
   *                      description: The player name
   *                    nickname:
   *                      type: string
   *                      description: The player nickname
   *                    matchesPlayed:
   *                      type: number
   *                      description: The player matches played
   *                    matchesWon:
   *                      type: number
   *                      description: The player matches won
   *                    matchesLost:
   *                      type: number
   *                      description: The player matches lost
   *
   */
  getPlayers = async (req: Request, res: Response): Promise<Response> => {
    const playerId =  req.params.id;
    if(playerId){
      const response = await this.playerService.getPlayer(playerId);
      if (!response) {
        return res.status(404).json({ error: "Player not found" });
      }
    return res.status(200).json(response);
  } else{
    const response = await this.playerService.getPlayers();
    return res.status(200).json(response);
    }
  };

  /**
   * @swagger
   * /players/{id}:
   *  put:
   *    summary: Update a player
   *    description: Update a player by ID
   *    tags:
   *      - Players
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *        description: The ID of the player to update
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: integer
   *                description: The player ID
   *              name:
   *                type: string
   *                description: The player name
   *              nickname:
   *                type: string
   *                description: The player nickname
   *              email:
   *                type: string
   *                description: The player email
   *    responses:
   *      200:
   *        description: Player updated successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *                  description: A success message with the updated player ID
   * 
   */
  updatePlayer = async (req: Request, res: Response): Promise<Response> => {
    try {const playerId = req.params.id;
    const playerData = await req.body;
    playerInputValidator(playerData);
    const response = await this.playerService.updatePlayer(playerId, playerData);
    if (!response) {
      return res.status(404).json({ error: "This Player not exist" });
    }
    return res.status(200).json({ message: response });
  } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "An unknown error occurred." });
    }
  };

  /**
   * @swagger
   * /players/{id}:
   *  delete:
   *    summary: Delete a player by ID
   *    description: Delete a player by ID
   *    tags:
   *      - Players
   *    parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        schema:
   *          type: string
   *        description: The ID of the player to delete
   *    responses:
   *      200:
   *        description: Player deleted successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *                  description: A success message
   *                playerId:
   *                  type: string
   *                  description: The ID of the deleted player
   */
  deletePlayer = async (req: Request, res: Response): Promise<Response> => {
    const playerId = req.params.id;
    const response = await this.playerService.deletePlayer(playerId);
    if (!response) {
      return res.status(404).json({ error: "This Player not exist" });
    }
    return res.status(200).json({ message: response });
  };
  
};

export default PlayerController;

