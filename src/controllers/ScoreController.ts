import { Request, Response } from "express";
import { ScoreService } from "../services/ScoreService";
import { ScoreData } from "../views/inputDTOs/inputedScoreData.DTO";


class ScoreController {

    constructor(private scoreService: ScoreService) {}
    /**
     * @swagger
     * /scores:
     *  post:
     *    summary: Store a new score
     *    description: Store a new score
     *    tags:
     *      - Scores
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              match:
     *                type: string
     *                description: The match ID
     *              kills:
     *                type: integer
     *                description: The number of kills
     *              deaths:
     *                type: integer
     *                description: The number of deaths
     *              assists:
     *                type: integer
     *                description: The number of assists
     *              totalDamage:
     *                type: integer
     *                description: The total damage
     *    responses:
     *      201:
     *        description: Score created successfully
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                message:
     *                  type: string
     *                  description: A success message
     *                score:
     *                  type: object
     *                  description: The created score
     *                  properties:
     *                    match:
     *                      type: string
     *                      description: The match ID
     *                    kills:
     *                      type: integer
     *                      description: The number of kills
     *                    deaths:
     *                      type: integer
     *                      description: The number of deaths
     *                    assists:
     *                      type: integer
     *                      description: The number of assists
     *                    totalDamage:
     *                      type: integer
     *                      description: The total damage
     */
    postScore = async (req: Request, res: Response): Promise<Response> =>{
        const scoreData = await req.body;
        const score = new ScoreData(Number(scoreData.matchId), scoreData.playerId, scoreData.points_made, scoreData.points_conceded);
        const response = await this.scoreService.createScoreByPlayerId(score);
        if (!response){ 
            return res.status(409).json({ message: "Score not created. Only one score per player per match." });}
        return res.status(201).json({
            message: `Score from ${scoreData.matchId}`,
            score
        });
    };
};
export default ScoreController;