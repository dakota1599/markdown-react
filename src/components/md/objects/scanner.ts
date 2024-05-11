import { Token, TokenType } from "../Md.types";

export class Scanner {
    private current = 0;
    private start = 0;
    private tokens: Token[] = [];
    constructor(private text: string) {
        this.text = this.text.trim() + "\n";
    }

    scan() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        return this.tokens;
    }

    private peek = () => (this.isAtEnd() ? "\0" : this.text[this.current]);

    private peekNext = () =>
        this.current + 1 >= this.text.length
            ? "\0"
            : this.text[this.current + 1];

    private scanToken() {
        const c = this.advance();

        switch (c) {
            case "*":
                this.asterisk();
                break;
            case "#":
                this.hashTag();
                break;
            case "\n":
                this.newline();
                break;
            default:
                this.alphaNum();
                break;
        }
    }

    private newline() {
        this.addToken(TokenType.Newline, "\n");
    }

    private alphaNum() {
        while (this.isAlphaNum()) {
            this.advance();
        }

        this.addToken(
            TokenType.Text,
            this.text.slice(this.start, this.current)
        );
    }

    private asterisk() {
        if (this.peek() == "*") {
            this.advance();
            this.addToken(TokenType.DoubleAsterisk, "**");
            return;
        }

        this.addToken(TokenType.Asterisk, "*");
    }

    private hashTag() {
        let i = 1;
        while (this.peek() == "#") {
            this.advance();
            i++;
        }

        switch (i) {
            case 1:
                this.addToken(TokenType.Hashtag, "#");
                break;
            case 2:
                this.addToken(TokenType.DoubleHashtag, "##");
                break;
            case 3:
                this.addToken(TokenType.TripleHashtag, "###");
                break;
        }
    }
    private addToken(tokenType: TokenType, value: string = "") {
        this.tokens.push({ type: tokenType, value });
    }

    private advance = () => this.text[this.current++];

    // Flags
    private isAtEnd = () => this.current >= this.text.length;
    private isAlphaNum() {
        const code = this.peek().charCodeAt(0);
        return (
            (code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123) ||
            (code >= 32 && code < 41)
        );
    }
}
