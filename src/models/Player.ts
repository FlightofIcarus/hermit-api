class Player implements IPlayer {
    constructor(
    public id: number,
    public name: string,
    public nickname: string,
    public email: string,
    public password: string,
    public matchesPlayed: number,
    public matchesWon: number,
    public matchesLost: number,
    public inGame: boolean
    ) {}
};

export { Player };