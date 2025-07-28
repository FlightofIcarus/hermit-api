interface ICreatedPlayer {
    id: number,
    name: string,
    nickname: string,
    email: string
};

class CreatedPlayer implements ICreatedPlayer {
    constructor(
        public id: number,
        public name: string,
        public nickname: string,
        public email: string
    ) {}
};

export { CreatedPlayer, ICreatedPlayer };