interface IScore {
    id: number;
    playerId: number;
    matchId: number;
    score: {
        pointsMade: number;
        pointsConceded: number;
    };
};