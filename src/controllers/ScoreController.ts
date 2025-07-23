import { Request, Response } from "express";

class ScoreController {
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