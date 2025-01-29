export class GameUtils {
    static checkGameStatus(board: string[][]): 'ongoing' | 'win' | 'draw' | 'lose' {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]) {
                if (board[i][0] === 'X')
                    return 'win';
                return 'lose'
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]) {
                if (board[0][i] === 'X')
                    return 'win';
                return 'lose'
            }
        }

        // Check diagonals
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
}