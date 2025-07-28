import { ViewMatch } from "./ViewMatches.DTO";

interface IMatchHistoryFromPlayer {
    id: number;
    name: string;
    status: string;
    points_made: number;
    points_conceded: number;
    match_history: ViewMatch[];
    getInstanceInfos(): Partial<IMatchHistoryFromPlayer>;
};

class MatchHistoryFromPlayer {
    constructor(
        private id: number,
        private name: string,
        private nickname: string,
        private points_made: number,
        private points_conceded: number,
        private match_history: ViewMatch[],
    ) {}
    getInstanceInfos(): Partial<IMatchHistoryFromPlayer> {
        return {
            id: this.id,
            name: this.name,
            status: this.nickname,
            match_history: this.match_history,
        }
    }
};

export { MatchHistoryFromPlayer, IMatchHistoryFromPlayer };