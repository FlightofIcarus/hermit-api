import { Player } from "../models/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { InputedPlayerData, IPlayerData } from "../views/inputDTOs/InputedPlayerData.DTO";
import { CreatedPlayer, ICreatedPlayer } from "../views/outputDTOs/CreatedPlayer.DTO";
import bcrypt from "bcryptjs";
import { ViewPlayer } from "../views/outputDTOs/ViewPlayer.DTO";


class PlayerService {
    constructor(private playerRepository: PlayerRepository) {}

    createPlayer = async (playerData: IPlayerData): Promise<ICreatedPlayer> => {
        const hashedPassword = bcrypt.hashSync(playerData.password, 8);
        playerData.password = hashedPassword;    
        const newPlayerData = new InputedPlayerData(
            playerData.name,
            playerData.nickname,
            playerData.email,
            hashedPassword
        );
        const createdPlayer: Player = await this.playerRepository.createPlayer(newPlayerData);

        return new CreatedPlayer(
            createdPlayer.id,
            createdPlayer.name,
            createdPlayer.nickname,
            createdPlayer.email
        );
    }

    getPlayers = async (): Promise<ViewPlayer[]> => {
        const players = await this.playerRepository.getAllPlayers();
        return players.map(player => new ViewPlayer(
            player.id,
            player.name,
            player.nickname,
            player.matches_played,
            player.matches_won,
            player.matches_lost
        ));
    }

    getPlayer = async (id: string): Promise<ViewPlayer | null> => {
        const player = await this.playerRepository.getPlayerById(id);
        if (!player) {
            return null;
        }
        return new ViewPlayer(
            player.id,
            player.name,
            player.nickname,
            player.matches_played,
            player.matches_won,
            player.matches_lost
        );
    }

    updatePlayer = async (id: string, playerData: IPlayerData): Promise<string | null> => {
        const hashedPassword = bcrypt.hashSync(playerData.password, 8);
        playerData.password = hashedPassword;    
        const playerUpdatedData = new InputedPlayerData(
            playerData.name,
            playerData.nickname,
            playerData.email,
            hashedPassword
        );

        const [affectedCount] = await this.playerRepository.updatePlayer(id, playerUpdatedData);

        if (affectedCount === 0) {
            return null;
        }

        return `Player with ID ${id} updated successfully`;
    }

    deletePlayer = async (id: string): Promise<string | null> => {

        const deletedCount = await this.playerRepository.deletePlayer(id);

        if (deletedCount === 0) {
            return null;
        }

        return `Player with ID ${id} deleted successfully`;
    }

    changeInGameStatus = async (id: string): Promise<void> => {
        const player = await this.playerRepository.getPlayerById(id);
        if (!player) {}

        const playerInGame = player.in_game;
        console.log(playerInGame);
        

        const [affectedCount] = await this.playerRepository.updatePlayer(id, {in_game: !playerInGame});

    }
};

export { PlayerService };