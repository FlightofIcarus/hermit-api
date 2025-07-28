interface IViewPlayer {
    id: number,
    name: string,
    nickname: string,
    matchesPlayed: number,
    matchesWon: number,
    matchesLost: number
};

class ViewPlayer implements IViewPlayer {
    constructor(
        public id: number,
        public name: string,
        public nickname: string,
        public matchesPlayed: number,
        public matchesWon: number,
        public matchesLost: number
    ) {}
};

export { ViewPlayer, IViewPlayer };