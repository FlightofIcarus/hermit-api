import { Request, Response, Router } from "express";

class PlayerController {
  static async createPlayer(req: Request, res: Response): Promise<Response> {
    const playerData = req.body;
    return res.status(201).json({ message: "Player created successfully", player: playerData });
  };

  static async getPlayers(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    if(playerId)
    return res.status(200).json({ message: "Player retrieved successfully", playerId });
    else
    return res.status(200).json({ message: "Players list retrieved successfully" });
  };

  static async updatePlayer(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    const playerData = req.body;
    return res.status(200).json({ message: "Player updated successfully", playerId, player: playerData });
  };

  static async deletePlayer(req: Request, res: Response): Promise<Response> {
    const playerId = req.params.id;
    return res.status(200).json({ message: "Player deleted successfully", playerId });
  };
};

export { PlayerController };

