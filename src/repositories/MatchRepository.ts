import {WhereOptions} from "sequelize";
import { MatchPlayerTable, MatchTable, PlayerTable } from "../config/dbInitialize";
import { MatchStatus } from "../models/interfaces/IMatch";
import { Match } from "../models/sequelize/ModelMatch";

type where = {};

class MatchRepository {

    constructor(private matchModel: typeof MatchTable){}

    getAllMatches = async (filter: WhereOptions): Promise<any> => {
        const matches = await this.matchModel.findAll({where: filter, include: 
            {model: PlayerTable, as: "players"}});
        if(!matches) return [];
        return matches;
    }

    getFiltredMatches = async (filter: WhereOptions): Promise<any> => {
        const matches = await this.matchModel.findAll({where: filter});
        if(!matches) return [];
        return matches.map(match => match.get({ plain: true }));
    }

    createMatch = async (matchData: any, playerId: number): Promise<any> => {
        const createdMatch = await this.matchModel.create({match_name:matchData.name, status: matchData.status});
        // @ts-ignore
        await createdMatch.setPlayers([playerId]);
        return createdMatch;
    }

    updateMatchStatus = async (matchId: number, status: MatchStatus): Promise<any> => {
        const match = await this.matchModel.update({status: status}, {where: {id: matchId}});
        return match;
    }    

    dateMatchRegister = async (matchId: number): Promise<any> => {
        const match = await this.matchModel.update({started_at: new Date()}, {where: {id: matchId}});
        return match;
    }

    insertPlayerInMatch = async (matchId: number, playerID: number): Promise<any> => {
        const match = await this.matchModel.findByPk(matchId);
        // @ts-ignore
        const players = await match.getPlayers();
        players.push(playerID);
        // @ts-ignore
        match.setPlayers(players);
        return match;
    }

    removePlayerFromMatch = async (matchId: number, playerID: number): Promise<any> => {
        const match = await MatchTable.findByPk(matchId);
        // @ts-ignore
        match.removePlayers([playerID]);
        return match;
    }

    getMatchPlayersByMatchId = async (matchId: number): Promise<any> => {
        const match = await this.matchModel.findByPk(matchId);
        // @ts-ignore
        const playersInMatch = await match.getPlayers();
        return playersInMatch.map(match => match.get({ plain: true }));
    }

};

export { MatchRepository };