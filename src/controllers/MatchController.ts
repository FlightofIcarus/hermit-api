import { log } from "console";
import { Request, Response } from "express";

export default class MatchController {
    static async getOpenedMatchs(req : Request, res: Response): Promise<Response> {
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
        })
    };

    static async postMatch(req: Request, res: Response): Promise<Response> {
        return res.status(201).json({
            message: "Match created successfully"})
    };

    static async postOpenedMatch(req: Request, res: Response): Promise<Response> {
        
        const matchId = req.params.matchid;

        return res.status(200).json({
            message: `You joined to the match ${matchId} successfully`})
    };

    static async deleteOpenedMatch(req: Request, res: Response): Promise<Response> {
        
        const requestBody = req.body;
        const matchId = req.params.matchid;

        console.log(typeof matchId);

        return res.status(200).json({
            message: `You leaved the match ${matchId} successfully`})
    };

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

    static async patchMatchStatus(req: Request, res: Response): Promise<Response> {
        const matchId = req.params.matchid;
        const newStatus = req.body.status;

        return res.status(200).json({
            message: `Match ${matchId} status updated to ${newStatus}`
        });
    };
};