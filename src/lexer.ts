import { Token } from "./types";

export default class Lexer {
    cursor: number;
    row: number;
    col: number;

    constructor(private src: string, public file_name: string) {
        this.cursor = 0;
        this.row = 0;
        this.col = 0;
    }

    run(): Token[] { 
        const tokens: Token[] = []; 
        return tokens; 
    }
}