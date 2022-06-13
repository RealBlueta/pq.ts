import { Position, Token, TokenType } from "./types";

export default class Lexer {
    private cursor: number;
    private row: number;
    private col: number;

    // Lexer Stuff
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

    // Lexing Functions (Data)
    current(): string | undefined {
        return this.src[this.cursor];
    }

    peek(num: number): string | undefined {
        return this.src[this.cursor + num];
    }

    advance(amount: number = 1): void {
        this.col += amount;
        this.cursor += amount;
    }

    // Lexing Functions (Lexums)
    consume_space(): void {
        this.advance();
    }

    consume_newline(): void {
        this.cursor += 1;
        this.col = 0;
        this.row += 1;
    }

    consume_tab(): void {
        this.cursor += 1;
        this.col += 4;
    }
}