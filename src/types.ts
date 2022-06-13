export type Position = {
    row: number;
    column: number;
    file: string;
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
    Slash,
    Percent,
    GreaterThan,
    LessThan,
    DoubleEquals,
    Period,
    Comma,
    Equals,
    Semicolon,
    Colon,
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
    constructor(message: string, position: Position) {
        super();
        this.message = `${message} (${position.file}:${position.row+1}:${position.column + 1})`;
        this.stack = undefined;
    }
}

export class Token {
    constructor(public type: TokenType, public position: Position, public contents: number | string | null = null) {}
}