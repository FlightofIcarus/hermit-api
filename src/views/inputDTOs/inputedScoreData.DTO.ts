interface IScoreData {
    match_id: number;
    player_id: number;
    points_made: number;
    points_conceded: number;
};

class ScoreData implements IScoreData {
    constructor(
        public match_id: number,
        public player_id: number,
        public points_made: number,
        public points_conceded: number) {}
};

export { ScoreData, IScoreData };