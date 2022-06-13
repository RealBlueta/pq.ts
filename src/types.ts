export type Position = {
    row: number;
    column: number;
    file: string;
};

export enum TokenType {
    LeftParen = 'LeftParenToken',
    RightParen = 'RightParenToken',
    LeftCurlyBracket = 'LeftCurlyBracketToken',
    RightCurlyBracket = 'RightCurlyBracketToken',
    LeftAngleBracket = 'LeftAngleBracketToken',
    RightAngleBracket = 'RightAngleBracketToken',
    Plus = 'PlusToken',
    Minus = 'MinusToken',
    Asterisk = 'AsteriskToken',
    Backslash = 'BackslashToken',
    Slash = 'SlashToken',
    Percent = 'PercentToken',
    GreaterThan = 'GreaterThanToken',
    LessThan = 'LessThanToken',
    DoubleEquals = 'DoubleEqualsToken',
    Period = 'PeriodToken',
    Comma = 'CommaToken',
    Equals = 'EqualsToken',
    Semicolon = 'SemicolonToken',
    Colon = 'ColonToken',
    Underscore = 'UnderscoreToken',
    And = 'AndToken',
    Caret = 'CaretToken',
    Dollar = 'DollarToken',
    Hashtag = 'HashtagToken',
    At = 'AtToken',
    Exclamation = 'ExclamationToken',
    QuestionMark = 'QuestionMarkToken',
    Pipe = 'PipeToken',
    Identifier = 'IdentifierToken',
    Number = 'NumberToken',
    String = 'StringLiteralToken',
    Comment = 'CommentToken',
    EOF = 'EndOfFileToken'
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