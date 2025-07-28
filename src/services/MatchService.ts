import { match } from "assert";
import { MatchRepository } from "../repositories/MatchRepository";
import { MatchStatus } from "../models/interfaces/IMatch";
import { NewMatchDTO } from "../models/DTOs/NewMatchDTO";
import { ViewMatch } from "../views/outputDTOs/ViewMatches.DTO";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { MatchHistoryFromPlayer } from "../views/outputDTOs/MatchHistoryFromPlayer.DTO";

class MatchService {
    constructor(private matchRepository: MatchRepository, private playerRepository: PlayerRepository) {}

    createMatch = async (matchData: any, ) => {
        const newMatch = new NewMatchDTO(matchData.match_name, matchData.started_at, matchData.status);
        const playerOwnerOfMatch = Number(matchData.playerId);
        this.leaveOtherMatch(playerOwnerOfMatch);
        await this.matchRepository.createMatch(newMatch, playerOwnerOfMatch);
    }

    joinMatch = async (matchId: string, playerId: string) => {
        const match_id = Number(matchId);
        const player_id = Number(playerId);
        const matchIsFullyRegistered = await this.matchRepository.getMatchPlayersByMatchId(match_id);
        
        if (matchIsFullyRegistered.length < 4 && matchIsFullyRegistered.some(player => player.id === player_id) === false) {
            this.leaveOtherMatch(player_id);
            return await this.matchRepository.insertPlayerInMatch(match_id, player_id)
        }else { 
            return null;}
    }

    leaveMatch = async (matchId: string, playerId: string) => {
        const match_id = Number(matchId);
        const player_id = Number(playerId);
        const playersRegistered = await this.matchRepository.getMatchPlayersByMatchId(match_id);
        
        if (playersRegistered.some(player => player.id === player_id)) {
            return await this.matchRepository.removePlayerFromMatch(match_id, player_id)
        } else {
            return null;}
    }

    startMatch = async (matchId: string, status: MatchStatus) => {
        const match_id = Number(matchId);
        await this.matchRepository.updateMatchStatus(match_id, status);
        await this.matchRepository.dateMatchRegister(match_id);
    }

    finishMatch = async (matchId: string, status: MatchStatus) => {
        const match_id = Number(matchId);
        await this.matchRepository.updateMatchStatus(match_id, status);
    }

    listOpenMatches = async () => {
       const openMatchesList = await this.matchRepository.getFiltredMatches({status: "waiting"});
       
       return openMatchesList.map((match: { id: number; match_name: string; status: string; }) => new ViewMatch(match.id, match.match_name, match.status));
    }

    leaveOtherMatch = async (playerId: number ) => {
        const player_id = Number(playerId);
        const search = await this.matchRepository.getAllMatches({status: "waiting"});
        await search.map(async (match) => await match.getPlayers().then(async (players) => {
            if(players.some(async player => player.id === player_id))
            await this.matchRepository.removePlayerFromMatch(match.id, player_id)}) )
        
        
        
    }

    listFinishedMatches = async (playerId: string) => {
        const player_id =playerId;
        const selectedPlayer = await this.playerRepository.getPlayersMatchsById(player_id);
        if (!selectedPlayer) {
            return null;
        } else {
            const playerMatchHistory = await selectedPlayer.getMatches()
            .then((matches) => matches.filter((match) => match.status === "finished")
            .map((match) => new ViewMatch(match.id, match.match_name, match.status)));
            const matchHistory = await new MatchHistoryFromPlayer(selectedPlayer.get().id, selectedPlayer.get().name, selectedPlayer.get().nickname, selectedPlayer.get().points_made, selectedPlayer.get().points_conceded,  playerMatchHistory).getInstanceInfos();
        
            return matchHistory;
    }

    }

};

export { MatchService };
