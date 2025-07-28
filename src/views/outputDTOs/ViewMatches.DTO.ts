interface IViewMatch {
    id: number,
    name: string,
    status: string,
};

class ViewMatch {
    constructor(
        public id: number,
        public name: string,
        public status: string,
    ) {}
};

export { IViewMatch, ViewMatch };