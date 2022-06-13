import { Token } from "./types";

export default class Lexer {
    private src: string;
    private row: number;
    private col: number;
    private cursor: number;

    constructor(contents: string) {
        this.src = contents;
        this.row = 0;
        this.col = 0;
        this.cursor = 0;
    }

    run(): Token[] { 
        const tokens: Token[] = []; 
        return tokens; 
    }
}