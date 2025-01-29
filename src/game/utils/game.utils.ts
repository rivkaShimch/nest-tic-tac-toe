export class GameUtils {
    static checkGameStatus(board: string[][]): 'ongoing' | 'win' | 'draw' | 'lose' {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                if (board[i][0] === 'X')
                    return 'win';
                return 'lose'
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                if (board[0][i] === 'X')
                    return 'win';
                return 'lose'
            }
        }

        if (board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]) {
            if (board[0][0] === 'X')
                return 'win';
            return 'lose'
        }

        if (board[0][2] !== '' &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]) {
            if (board[0][2] === 'X')
                return 'win';
            return 'lose'
        }

        // Check for draw
        const isBoardFull = board.every(row =>
            row.every(cell => cell !== '')
        );

        return isBoardFull ? 'draw' : 'ongoing';
    }

    static generateBotMove(board: string[][]): { row: number; column: number } {
        const emptyCells: { row: number; column: number }[] = [];

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    emptyCells.push({ row, column: col });
                }
            }
        }

        if (emptyCells.length === 0) {
            throw new Error('No valid moves available');
        }

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    static isMoveValid(board: string[][], move: { row: number; column: number }): boolean {
        return board[move.row][move.column] === '';
    }


    static strategicBotMove(board: string[][]): { row: number; column: number } {
        // If bot can win
        const winningMove = this.findWinningMove(board, 'O');
        if (winningMove) return winningMove;

        const blockingMove = this.findWinningMove(board, 'X');
        if (blockingMove) return blockingMove;

        if (board[1][1] === '') {
            return { row: 1, column: 1 };
        }

        const corners = [
            { row: 0, column: 0 },
            { row: 0, column: 2 },
            { row: 2, column: 0 },
            { row: 2, column: 2 }
        ];

        for (const corner of corners) {
            if (board[corner.row][corner.column] === '') {
                return corner;
            }
        }

        const sides = [
            { row: 0, column: 1 },
            { row: 1, column: 0 },
            { row: 1, column: 2 },
            { row: 2, column: 1 }
        ];

        for (const side of sides) {
            if (board[side.row][side.column] === '') {
                return side;
            }
        }

        // Find any empty cell
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') {
                    return { row, column: col };
                }
            }
        }

        throw new Error('No valid moves available');
    }

    private static findWinningMove(board: string[][], player: string): { row: number; column: number } | null {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = player;
                    if (this.checkWin(board, player)) {
                        board[i][j] = ''; 
                        return { row: i, column: j };
                    }
                    board[i][j] = ''; 
                }
            }
        }
        return null;
    }

    private static checkWin(board: string[][], player: string): boolean {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
                return true;
            }
        }

        if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
            return true;
        }
        if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
            return true;
        }

        return false;
    }
}