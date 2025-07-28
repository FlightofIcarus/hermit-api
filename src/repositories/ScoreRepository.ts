import { ScoreTable } from "../config/dbInitialize";
import { IScoreData } from "../views/inputDTOs/inputedScoreData.DTO";

class ScoreRepository {

    constructor(private scoreModel: typeof ScoreTable){}

    createScoreByPlayerId = async (scoreData: IScoreData) => {
        
        const createdScore = await this.scoreModel.create( {
            points_made: scoreData.points_made,
            points_conceded: scoreData.points_conceded,
            MatchId: scoreData.match_id, 
            PlayerId: scoreData.player_id} );
        
        return createdScore.get({ plain: true });
    }

    getScoreByMatchId = async (matchId: number) => {
        const score = await this.scoreModel.findAll({where: {MatchId: matchId}});
        return score.map(score => score.get({ plain: true }));
    }
};

export { ScoreRepository };