import { LexerError, Position, Token, TokenType } from "./types";

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
        while (this.current()) {
			if (this.current() == ' ') {
				this.consume_space();
				continue;
            }
							
			if (this.current() == '\n') {
				this.consume_newline();
				continue;
            }
				
			if (this.current() == '\t') {
				this.consume_tab();
				continue;
            }

			if ('+-/*%><'.includes(this.current()!)) {
				this.lex_binary_operator(tokens);
				continue;
            }
				
			if (this.current() == '=' && this.peek(1) == '=') {
				this.lex_binary_equals(tokens);
				continue;
            }
				
			if ('{}[]()'.includes(this.current()!)) {
				this.lex_brackets(tokens);
				continue;
            }

			if ('.,=:;_\\&^$#@!?|'.includes(this.current()!)) {
				this.lex_etc(tokens);
				continue;
            }

			if (this.is_alphabetic(this.current()!)) {
				this.lex_identifier(tokens);
				continue;
            }
				
			if (this.is_numeric(this.current()!)) {
				this.lex_numbers(tokens);
				continue;
            }

			if ("\"'`".includes(this.current()!)) {
				this.lex_string(tokens);
				continue;
            }
				
			if (this.current() == '/' && this.peek(1) == '/') {
				this.lex_comment(tokens);
				continue;
            }

            throw new LexerError(`Unknown token '${this.current()}'`, this.position());
        }
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

    // Lexing Functions (Consumers)
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

    // Lexing Functions (Lexums)
    lex_binary_operator(tokens: Token[]): void {
        const pos = this.position();
        let type = null;
        if (this.current() == '+') type = TokenType.Plus;
		else if (this.current() == '-') type = TokenType.Minus;
		else if (this.current() == '/') type = TokenType.Slash;
		else if (this.current() == '*') type = TokenType.Asterisk;
        else if	(this.current() == '%') type = TokenType.Percent;
		else if (this.current() == '>') type = TokenType.GreaterThan;		
		else if (this.current() == '<') type = TokenType.LessThan;
        if (type == null) throw new LexerError(`Failed to lex binary operator... Instead got '${this.current()}'.`, pos);
		this.advance();
		tokens.push(new Token(type, pos));
    }

    lex_binary_equals(tokens: Token[]): void {
        const pos = this.position();
		this.advance(2);
		tokens.push(new Token(TokenType.DoubleEquals, pos));
    }

    lex_brackets(tokens: Token[]): void {
        const pos = this.position();
        let type = null;
		if (this.current() == '{') type = TokenType.LeftCurlyBracket;
		else if (this.current() == '}') type = TokenType.RightCurlyBracket;
		else if (this.current() == '[') type = TokenType.LeftAngleBracket;
		else if (this.current() == ']') type = TokenType.RightAngleBracket;
		else if (this.current() == '(') type = TokenType.LeftParen;
		else if (this.current() == ')') type = TokenType.RightParen;
        if (type == null) throw new LexerError(`Failed to lex brackets... Instead got '${this.current()}'.`, pos);
		this.advance();
		tokens.push(new Token(type, pos));
    }

    lex_etc(tokens: Token[]): void {
        const pos = this.position();
        let type = null;
        if (this.current() == '.') type = TokenType.Period;
		else if (this.current() == ',') type = TokenType.Comma;
		else if (this.current() == ';') type = TokenType.Semicolon;
		else if (this.current() == ':') type = TokenType.Colon;
		else if (this.current() == '\\') type = TokenType.Backslash;
		else if (this.current() == '=') type = TokenType.Equals;
		else if (this.current() == '_') type = TokenType.Underscore;
		else if (this.current() == '&') type = TokenType.And;
		else if (this.current() == '^') type = TokenType.Caret;
		else if (this.current() == '$') type = TokenType.Dollar;
		else if (this.current() == '#') type = TokenType.Hashtag;
		else if (this.current() == '@') type = TokenType.At;
		else if (this.current() == '!') type = TokenType.Exclamation;
		else if (this.current() == '?') type = TokenType.QuestionMark;
		else if (this.current() == '|') type = TokenType.Pipe;
        if (type == null) throw new LexerError(`Failed to lex etc... Instead got '${this.current()}'.`, pos);
		this.advance();
		tokens.push(new Token(type, pos));
    }

    lex_comment(tokens: Token[]): void {
        const pos = this.position();
		this.advance(2); // skip both /
		let comment = '';
		while (this.current() && !(this.current() == '\n')) {
			comment += this.current();
			this.advance();
        }
		tokens.push(new Token(TokenType.Comment, pos, comment.trimStart()));
    }

    lex_string(tokens: Token[]): void {
        const pos = this.position();
		let string = '';
		this.advance(1); // skip " '
		while (this.current() && !("\"'`".includes(this.current()!))) {
			string += this.current();
			this.advance();
        }
		if (!this.current()) 
			throw new LexerError("Unclosed string literal", pos);
		this.advance(1); // skip " '
		tokens.push(new Token(TokenType.String, pos, string));
    }
    
    lex_identifier(tokens: Token[]): void {
        const pos = this.position();
		let identifier = '';
        while (this.current()) {
            if (' \n\t{}[]();:+-*%/\\.,='.includes(this.current()!)) 
                break;
            identifier += this.current();
            this.advance();
        }
		tokens.push(new Token(TokenType.Identifier, pos, identifier));
    }

    lex_numbers(tokens: Token[]): void {
        const pos = this.position();
		let dots = 0;
		let num_str = '';
        while (this.current()) {
			if (!this.is_numeric(this.current()!) && !(this.current() == '.'))
				break;
			if (this.current() == '.')
				dots += 1;
			num_str += this.current();
			this.advance();
        }
        if (dots > 1)
			throw new LexerError('Numbers can only contain one decimal', pos);
		tokens.push(new Token(TokenType.Number, pos, Number(num_str)));
    }

    // Helpers
    is_alphabetic(input: string): boolean {
        return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(input);
    }

    is_numeric(input: string): boolean {
        return '1234567890'.includes(input);
    }
}