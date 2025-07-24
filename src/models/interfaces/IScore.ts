type ScorePoints = {
        pointsMade: number;
        pointsConceded: number;
    };

interface IScore {
    id: number;
    playerId: number;
    matchId: number;
    score: ScorePoints;
};