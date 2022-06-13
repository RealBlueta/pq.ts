import Lexer from "./lexer";
import { Node } from "./expression";
import { Token } from "./token";

export default class Parser {
    private tokens: Token[];
    
    constructor(lexer: Lexer) {
        this.tokens = lexer.run();
    }

    run(): Node[] {
        const ast: Node[] = [];
        
        return ast;
    }
}