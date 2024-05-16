import { Token, TokenType } from "../Md.types";

export class Scanner {
    private current = 0;
    private start = 0;
    private line = 0;
    private tokens: Token[] = [];
    constructor(private text: string) {
        this.text = this.text.trim() + "\n";
    }

    scan() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }

        this.organizeLine();
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

    private organizeLine() {
        let open = false
        for (let i = this.line; i+1 < this.tokens.length; i++) {
            if (this.tokens[i].type == TokenType.DoubleAsterisk && this.tokens[i + 1].type == TokenType.Asterisk) {
                if (!open) {
                    open = true;
                    continue;
                }
    
                const hold = this.tokens[i]
                this.tokens[i] = this.tokens[i + 1]
                this.tokens[i + 1] = hold;
            }
        }
    }

    private newline() {
        this.organizeLine();
        this.addToken(TokenType.Newline, "\n");
        this.line = this.tokens.length;
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
