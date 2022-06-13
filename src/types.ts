import Lexer from "./lexer";

export type Position = {
    line: number;
    column: number;
};

export enum TokenType {
    LeftParen,
    RightParen,
    LeftCurlyBracket,
    RightCurlyBracket,
    LeftAngleBracket,
    RightAngleBracket,
    Plus,
    Minus,
    Asterisk,
    Backslash,
    Percent,
    GreaterThan,
    LessThan,
    DoubleEquals,
    Period,
    Comma,
    Equals,
    Semicolon,
    Underscore,
    And,
    Caret,
    Dollar,
    Hashtag,
    At,
    Exclamation,
    Identifier,
    Number,
    String,
    Comment,
    EOF
}

export class LexerError extends Error {
    constructor(message: string, lexer: Lexer) {
        super();
        this.message = `${message} (${lexer.file_name}:${lexer.row}:${lexer.col})`;
    }
}

export class Token {
    constructor(public type: TokenType, public position: Position, public contents: number | string | null = null) {}
}