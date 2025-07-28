import { MatchStatus } from "../interfaces/IMatch";

class NewMatchDTO {
    constructor(public name: string, public startedAt: Date, public status: MatchStatus) {}
};

export { NewMatchDTO };