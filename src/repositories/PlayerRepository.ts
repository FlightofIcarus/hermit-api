import { PlayerTable } from "../config/dbInitialize";

class PlayerRepository {

    constructor(private playerModel: typeof PlayerTable) {}
    createPlayer = async(playerData: any) => {
        const createdPlayer = await this.playerModel.create(playerData);
        return createdPlayer.get({ plain: true });
    }

    getAllPlayers = async() => {
        const players = await this.playerModel.findAll();
        if (!players) return [];
        return players.map(player => player.get({ plain: true }));
    }

    getPlayersMatchsById = async (playerId: string) => {
        const player = await this.playerModel.findByPk(playerId);
        return player ? player : null;
    }

    getPlayerById = async(playerId: string) => {
        const player = await this.playerModel.findByPk(playerId);
        return player ? player.get({ plain: true }) : null;
    }

    updatePlayer = async(playerId: string, playerData: any) => {
        console.log(playerData);
        
        return await this.playerModel.update(playerData, {
            where: { id: playerId }
        });
    }

    deletePlayer = async(playerId: string) => {
        return await this.playerModel.destroy({
            where: { id: playerId }
        });
    }
}

export { PlayerRepository };
