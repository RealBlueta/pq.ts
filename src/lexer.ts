import { Position, Token, TokenType } from "./types";

export default class Lexer {
    private cursor: number;
    private row: number;
    private col: number;

    constructor(private src: string, public file_name: string) {
        this.cursor = 0;
        this.row = 0;
        this.col = 0;
    }

    position(): Position {
        return {
            row: this.row,
            column: this.col,
            file: this.file_name
        }
    }

    run(): Token[] { 
        const tokens: Token[] = []; 
        tokens.push(new Token(TokenType.EOF, this.position()));
        return tokens; 
    }
}