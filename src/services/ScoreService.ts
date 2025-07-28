import { Score } from "../models/Score";
import { ScoreRepository } from "../repositories/ScoreRepository";
import { IScoreData } from "../views/inputDTOs/inputedScoreData.DTO";

class ScoreService {
    constructor(private scoreRepository: ScoreRepository) {}

    createScoreByPlayerId = async (score: IScoreData) => {
        
        const MatchResults = await this.scoreRepository.getScoreByMatchId(score.match_id);

        if (MatchResults.some(score => score.playerId === score.player_id)){ 
            return null
        }
        const PlayerResult = await this.scoreRepository.createScoreByPlayerId(score);
        return PlayerResult;
    }
};

export { ScoreService };