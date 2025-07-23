import { Request, Response } from "express";

class PlayerController {
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
   *              name:
   *                type: string
   *                description: The player name
   *              nickname:
   *                type: string
   *                description: The player nickname
   *              email:
   *                type: string
   *                description: The player email
   *              password:
   *                type: string
   *                description: The player password
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
   *                    name:
   *                      type: string
   *                      description: The player name
   *                    nickname:
   *                      type: string
   *                      description: The player nickname
   *                    email:
   *                      type: string
   *                      description: The player email
   */
  static async createPlayer(req: Request, res: Response): Promise<Response> {
    const playerData = req.body;
    return res.status(201).json({ message: "Player created successfully", player: playerData });
  };

  /**
   * @swagger
   * /players:
   *  get:
   *    summary: Retrieve the players list
   *    description: Retrieve the players list
   *    tags:
   *      - Players
   *    responses:
   *      200:
   *        description: Players list retrieved successfully
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *                  description: A success message
   */
  static async getPlayers(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    if(playerId)
    return res.status(200).json({ message: "Player retrieved successfully", playerId });
    else
    return res.status(200).json({ message: "Players list retrieved successfully" });
  };

  /**
   * @swagger
   * /players/{id}:
   *  patch:
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
   *              name:
   *                type: string
   *                description: The player name
   *              nickname:
   *                type: string
   *                description: The player nickname
   *              email:
   *                type: string
   *                description: The player email
   *              password:
   *                type: string
   *                description: The player password
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
   *                  description: A success message
   *                playerId:
   *                  type: string
   *                  description: The ID of the updated player
   *                player:
   *                  type: object
   *                  description: The updated player
   *                  properties:
   *                    name:
   *                      type: string
   *                      description: The player name
   *                    nickname:
   *                      type: string
   *                      description: The player nickname
   *                    email:
   *                      type: string
   *                      description: The player email
   */
  static async updatePlayer(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    const playerData = req.body;
    return res.status(200).json({ message: "Player updated successfully", playerId, player: playerData });
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
  static async deletePlayer(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    return res.status(200).json({ message: "Player deleted successfully", playerId });
  };
};

export default PlayerController;

