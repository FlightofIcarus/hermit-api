type score = {
        pointsMade: number;
        pointsConceded: number;
    };

interface IScore {
    id: number;
    playerId: number;
    matchId: number;
    score: score;
};