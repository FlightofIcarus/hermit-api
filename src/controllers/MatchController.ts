import { Request, Response } from "express";

class MatchController {
    /**
     * @swagger
     * /matches/opened:
     *  get:
     *    summary: Retrieve a list of opened matches
     *    description: Get a list of matches that are currently open
     *    tags:
     *      - Matches
     *    responses:
     *      200:
     *        description: A list of opened matches
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                openedMatchList:
     *                  type: array
     *                  items:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: integer
     *                      title:
     *                        type: string
     *                      status:
     *                        type: string
     *                      startedAt:
     *                        type: string
     *                        format: date
     */
    static async getOpenedMatchs(req: Request, res: Response): Promise<Response> {
        return res.status(200).json({
            openedMatchList: [
                {
                    id: 1,
                    title: "Match 1",
                    status: "open",
                    startedAt: "2025-07-22"
                },
                {
                    id: 2,
                    title: "Match 2",
                    status: "open",
                    startedAt: "2025-07-22"
                }
            ]
        });
    }

    /**
     * @swagger
     * /matches:
     *  post:
     *    summary: Create a new match
     *    description: Create a new match
     *    tags:
     *      - Matches
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              title:
     *                type: string
     *                description: The match title
     *              startedAt:
     *                type: string
     *                description: The match start date
     *              status:
     *                type: string
     *                description: The match status
     *    responses:
     *      201:
     *        description: Match created successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     */
    static async postMatch(req: Request, res: Response): Promise<Response> {
        return res.status(201).json({
            message: "Match created successfully"})
    };

    /**
     * @swagger
     * /matches/{matchid}/players/{playerid}:
     *  post:
     *    summary: Join a player to a match
     *    description: Add a player to an opened match using match ID and player ID
     *    tags:
     *      - Matches
     *    parameters:
     *      - in: path
     *        name: matchid
     *        required: true
     *        schema:
     *          type: string
     *        description: The ID of the match
     *      - in: path
     *        name: playerid
     *        required: true
     *        schema:
     *          type: string
     *        description: The ID of the player
     *    responses:
     *      200:
     *        description: Player joined the match successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     */
    static async postOpenedMatch(req: Request, res: Response): Promise<Response> {
        const matchId = req.params.matchid;
        return res.status(200).json({
            message: `You joined to the match ${matchId} successfully`
        });
    }

    /**
     * @swagger
     * /matches/{matchid}/players/{playerid}:
     *  delete:
     *    summary: Leave a match
     *    description: Remove a player from an opened match using match ID and player ID
     *    tags:
     *      - Matches
     *    parameters:
     *      - in: path
     *        name: matchid
     *        required: true
     *        schema:
     *          type: string
     *        description: The ID of the match
     *      - in: path
     *        name: playerid
     *        required: true
     *        schema:
     *          type: string
     *        description: The ID of the player
     *    responses:
     *      200:
     *        description: Player left the match successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     */
    static async deleteOpenedMatch(req: Request, res: Response): Promise<Response> {
        
        const requestBody = req.body;
        const matchId = req.params.matchid;

        console.log(typeof matchId);

        return res.status(200).json({
            message: `You leaved the match ${matchId} successfully`})
    };

    /**
     * @swagger
     * /matches:
     *  get:
     *    summary: Get the match history
     *    description: Get the match history
     *    tags:
     *      - Matches
     *    parameters:
     *      - in: query
     *        name: status
     *        required: false
     *        schema:
     *          type: string
     *        description: The status of the match to filter
     *      - in: query
     *        name: player
     *        required: false
     *        schema:
     *          type: string
     *        description: The player ID to filter
     *    responses:
     *      200:
     *        description: Match history retrieved successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     *                matchHistory:
     *                  type: array
     *                  items:
     *                    type: object
     *                    properties:
     *                      id:
     *                        type: integer
     *                        description: The match ID
     *                      title:
     *                        type: string
     *                        description: The match title
     *                      status:
     *                        type: string
     *                        description: The match status
     *                      startedAt:
     *                        type: string
     *                        description: The match start date
     *                      score:
     *                        type: object
     *                        properties:
     *                          kills:
     *                            type: integer
     *                            description: The number of kills
     *                          deaths:
     *                            type: integer
     *                            description: The number of deaths
     *                          assists:
     *                            type: integer
     *                            description: The number of assists
     *                          totalDamage:
     *                            type: integer
     *                            description: The total damage
     */
    static async getMatchHistory(req: Request, res: Response): Promise<Response> {
        const {status, player: playerId} = req.query;
        console.log(typeof playerId);
        

        return res.status(200).json({
            message: `Showing ${status} match history from player ${playerId}`,

            matchHistory: [
                {
                    id: 1,
                    title: "Match 1",
                    status: "completed",
                    startedAt: "2025-07-20",
                    score: {
                        kills: 10,
                        deaths: 4,
                        assists: 2,
                        totalDamage: 40000,
                    }
                },
                {
                    id: 2,
                    title: "Match 2",
                    status: "completed",
                    startedAt: "2025-07-21",
                    score: {
                        kills: 8,
                        deaths: 5,
                        assists: 3,
                        totalDamage: 35000,
                    }
                }
            ]
        });
    }

    /**
     * @swagger
     * /matches/{matchid}:
     *  patch:
     *    summary: Update match status
     *    description: Update the status of a match using match ID
     *    tags:
     *      - Matches
     *    parameters:
     *      - in: path
     *        name: matchid
     *        required: true
     *        schema:
     *          type: string
     *        description: The ID of the match
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              status:
     *                type: string
     *                description: The new status of the match
     *    responses:
     *      200:
     *        description: Match status updated successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     */
    static async patchMatchStatus(req: Request, res: Response): Promise<Response> {
        const matchId = req.params.matchid;
        const newStatus = req.body.status;

        return res.status(200).json({
            message: `Match ${matchId} status updated to ${newStatus}`
        });
    };
};

export default MatchController;