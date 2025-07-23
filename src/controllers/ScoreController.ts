import { Request, Response } from "express";

class ScoreController {
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
    static async postScore(req: Request, res: Response): Promise<void> {
        const { match: matchId } = req.query;
        const score = req.body;

        res.status(201).json({
            message: `Score from ${matchId}`,
            score
        });
    };
};
export default ScoreController;