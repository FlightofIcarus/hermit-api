class Match implements IMatch {
    constructor(
    public id: number,
    public matchName: string,
    public status: MatchStatus,
    public startedAt: Date,
    public players: IPlayer[],
    public scores: IScore[]
    ) {}
};

export { Match };