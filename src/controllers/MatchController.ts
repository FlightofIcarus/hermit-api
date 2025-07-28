import e, { Request, Response } from "express";
import { MatchPlayerTable, MatchTable, PlayerTable } from "../config/dbInitialize";
import { Match } from "../models/sequelize/ModelMatch";
import { MatchService } from "../services/MatchService";

class MatchController {
    
    constructor(private matchService: MatchService){}

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
    getOpenedMatchs = async (req: Request, res: Response): Promise<Response> => {
        const response = await this.matchService.listOpenMatches();
        return res.status(200).json(response);
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
    postMatch = async (req: Request, res: Response): Promise<Response> => {

        const matchData = await req.body;

        const match = await this.matchService.createMatch({
            match_name: matchData.match_name,
            started_at: matchData.started_at,
            status: matchData.status,
            playerId: matchData.playerId
        })
        console.log(match);
        return res.status(201).json({
            message: "Match created successfully", matchInfo: match})
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
    postOpenedMatch = async (req: Request, res: Response): Promise<Response> => {
        const {matchid: matchId, playerid: playerId} = await req.params;
        console.log(matchId);
        const response = await this.matchService.joinMatch(matchId, playerId);
        // console.log(response);
        
        if (!response) {
          return res.status(404).json({
            message: `The match ${matchId} is full or player ${playerId} is already in the match. Sorry!`
          });  
        }
        return res.status(200).json({
            message: `Player ${playerId} joined to the match ${matchId} successfully`
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
    deleteOpenedMatch = async (req: Request, res: Response): Promise<Response> => {
        const {matchid: matchId, playerid: playerId} = await req.params;
        console.log(matchId);
        const response = await this.matchService.leaveMatch(matchId, playerId);
        // console.log(response);
        
        if (!response) {
          return res.status(404).json({
            message: `This player ${playerId} is not in the match ${matchId}.`
          })} 
        return res.status(200).json({
            message: `Player ${playerId} leaved to the match ${matchId} successfully`
        });
    }
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
    getMatchHistory = async (req: Request, res: Response): Promise<Response> => {
        const {status, player: playerId} = req.query;
        if(status === 'finished'){
        const matchHistory = await this.matchService.listFinishedMatches((playerId || '') as string);
            if (!matchHistory) {
                return res.status(404).json({ error: "Player not found. Impossible to show match history." });}
            
            return res.status(200).json({
            message: `Showing ${status} match history from player ${playerId}.`,
            matchHistory: matchHistory
        });}else {
            return res.status(400).json({ error: "An unknown error occurred." });}
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
    patchMatchStatus = async(req: Request, res: Response): Promise<Response> => {
        const matchId = req.params.matchid;
        const newStatus = req.body.status;
        if(newStatus !== 'finished' && newStatus !== 'in_progress' && newStatus !== 'waiting'){ 
        return res.status(400).json({error: 'Invalid status'})
        } else if(newStatus === 'in_progress'){
            await this.matchService.startMatch(matchId, newStatus);
            return res.status(200).json({
                message: `Match ${matchId} started!`
            });
        } else if(newStatus === 'finished'){
        await this.matchService.finishMatch(matchId, newStatus);
        return res.status(200).json({
            message: `Match ${matchId} finished!`
        });
    } return res.status(400).json({ error: "An unknown error occurred." })
    };
};

export default MatchController;