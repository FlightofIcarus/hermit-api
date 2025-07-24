type MatchStatus = "waiting" | "in-progress" | "finished";

interface IMatch {
    id: number;
    matchName: string;
    status: MatchStatus;
    startedAt: Date;
    players: IPlayer[];
    scores: IScore[];
};
