class Score implements IScore {
    constructor(
        public id: number,
        public playerId: number,
        public matchId: number,
        public score: score
    ) {}
};

export { Score };