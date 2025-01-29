import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Game } from '../database/schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameUtils } from './utils/game.utils';

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private gameModel: Model<Game>) { }


    async processMove(playerEmail: string, move: { row: number; column: number }, hard: string) {
        const game = await this.findActiveGame(playerEmail);
        if (!game) {
            throw new NotFoundException('No active game found');
        }

        // Validate player's move
        if (!GameUtils.isMoveValid(game.board, move)) {
            throw new BadRequestException('Invalid move: cell already occupied');
        }

        // Make player's move
        game.board[move.row][move.column] = 'X';
        game.currentTurn = 'bot';

        // Check game state after player's move
        let status = GameUtils.checkGameStatus(game.board);
        if (status !== 'ongoing') {
            game.status = status;
            await game.save();
            return { status, botMove: null };
        }

        // Generate and make bot's move
        try {
            let botMove: { row: number; column: number }
            if (hard === "true"){
                botMove = GameUtils.strategicBotMove(game.board)
            }
            else
                botMove = GameUtils.generateBotMove(game.board);

            game.board[botMove.row][botMove.column] = 'O';
            game.currentTurn = 'player';

            // Check game state after bot's move
            status = GameUtils.checkGameStatus(game.board);
            game.status = status;
            await game.save();

            return { status, botMove };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findActiveGame(playerEmail: string): Promise<Game | null> {
        return this.gameModel.findOne({
            playerEmail,
            status: 'ongoing'
        });
    }

    async getOrCreateGame(playerEmail: string): Promise<Game> {
        // Try to find an existing ongoing game
        let game = await this.gameModel.findOne({
            playerEmail,
            status: 'ongoing'
        });

        // If no ongoing game exists, create a new one
        if (!game) {
            game = new this.gameModel({
                playerEmail,
                board: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                status: 'ongoing',
                currentTurn: 'player'
            });
            await game.save();
        }

        return game;
    }

    async restartGame(playerEmail: string): Promise<Game | null> {
        let game = await this.gameModel.findOneAndUpdate(
            { playerEmail, status: "ongoing" },
            {
                $set: {
                    playerEmail,
                    board: [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ],
                    status: 'ongoing',
                    currentTurn: 'player'
                }
            },
            { new: true }
        );
        if (!game) {
            throw new Error("No active game found for this player.");
        }
        return game
    }
}
