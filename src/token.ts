export type Position = {
    row: number;
    column: number;
    file: string;
};

export enum TokenType {
    LeftParen = 'LeftParen',
    RightParen = 'RightParen',
    LeftCurlyBracket = 'LeftCurlyBracket',
    RightCurlyBracket = 'RightCurlyBracket',
    LeftAngleBracket = 'LeftAngleBracket',
    RightAngleBracket = 'RightAngleBracket',
    Plus = 'Plus',
    Minus = 'Minus',
    Asterisk = 'Asterisk',
    Backslash = 'Backslash',
    Slash = 'Slash',
    Percent = 'Percent',
    GreaterThan = 'GreaterThan',
    LessThan = 'LessThan',
    DoubleEquals = 'DoubleEquals',
    Period = 'Period',
    Comma = 'Comma',
    Equals = 'Equals',
    Semicolon = 'Semicolon',
    Colon = 'Colon',
    Underscore = 'Underscore',
    And = 'And',
    Caret = 'Caret',
    Dollar = 'Dollar',
    Hashtag = 'Hashtag',
    At = 'At',
    Exclamation = 'Exclamation',
    QuestionMark = 'QuestionMark',
    Pipe = 'Pipe',
    Identifier = 'Identifier',
    Number = 'Number',
    String = 'StringLiteral',
    Comment = 'Comment',
    EOF = 'EndOfFile'
}

export class Token {
    constructor(public type: TokenType, public position: Position, public contents: number | string | null = null) {}
}