import { Fragment, ReactElement, ReactNode } from "react";
import { Token, TokenType, Operators, ReactComponent } from "../Md.types";
import { Error } from "./error";
import React from "react";

export class Parser {
    private current = 0;
    private line = 1;
    private isError = false;
    private react: ReactNode[] = [];
    constructor(private tokens: Token[], private operators: Operators) {}

    public parse(): ReactNode {
        while (!this.isAtEnd() && !this.isError) {
            this._parse(this.react);
        }

        return (
            <>
                {this.react.map((c, i) => (
                    <span key={i}>{c}</span>
                ))}
            </>
        );
    }

    private _parse(list: ReactNode[]) {
        if (this.isError) return;
        switch (this.tokens[this.current].type) {
            case TokenType.Asterisk:
                this.add(list, this.asterisk());
                break;
            case TokenType.DoubleAsterisk:
                this.add(list, this.asterisk(TokenType.DoubleAsterisk));
                break;
            case TokenType.Hashtag:
                this.add(list, this.hashTag());
                break;
            case TokenType.DoubleHashtag:
                this.add(list, this.doubleHashTag());
                break;
            case TokenType.TripleHashtag:
                this.add(list, this.tripleHashTag());
                break;
            case TokenType.Underscore:
                break;
            case TokenType.DoubleUnderscore:
                break;
            case TokenType.Newline:
                this.add(list, this.newline());
                break;
            case TokenType.Text:
                this.add(list, this.text());
                break;
            default:
                Error.log(
                    "parsing",
                    `Unknown token type: ${this.tokens[this.current].type}.`
                );
                this.isError = true;
                break;
        }
        this.current++;
    }

    private asterisk(type: TokenType = TokenType.Asterisk): ReactNode {
        const bold: ReactNode[] = [];
        const others: ReactNode[] = [];

        this.runWrappedLine(bold, others, type);

        const op =
            type == TokenType.Asterisk
                ? this.operators.italics
                : this.operators.bold;

        this.add(others, this.newline());

        return (
            <>
                {this.createElement(op, bold)}
                {this.createElement(React.Fragment, others)}
            </>
        );
    }

    private hashTag(): ReactNode {
        const local: ReactElement[] = [];
        const op = this.operators.h1;

        this.runLine(local);

        return this.createElement(op, local);
    }

    private doubleHashTag(): ReactNode {
        const local: ReactElement[] = [];
        const op = this.operators.h2;

        this.runLine(local);

        return this.createElement(op, local);
    }

    private tripleHashTag(): ReactNode {
        const local: ReactElement[] = [];
        const op = this.operators.h3;

        this.runLine(local);

        return this.createElement(op, local);
    }

    private newline(): ReactNode {
        this.line++;
        return <br />;
    }

    private text(): ReactNode {
        const starting = this.tokens[this.current].value;
        const op = this.operators.text;
        return React.createElement(op, {}, <>{starting}</>);
    }

    private add(list: ReactNode[], node: ReactNode) {
        list.push(node);
    }

    private runLine(list: ReactNode[], until: number = this.tokens.length) {
        this.current++;
        if (this.current >= until) return;
        while (
            this.current < until &&
            this.tokens[this.current].type != TokenType.Newline
        ) {
            this._parse(list);
        }
    }

    private runLineUntilType(list: ReactNode[], until: TokenType) {
        this.current++;
        while (!this.isAtEnd()) {
            if (this.tokens[this.current].type == TokenType.Newline)
                return TokenType.Newline;
            if (this.tokens[this.current].type == until) return until;
            this._parse(list);
        }
    }

    private runWrappedLine(
        wrapped: ReactNode[],
        others: ReactNode[],
        type: TokenType
    ) {
        if (this.runLineUntilType(wrapped, type) == TokenType.Newline) {
            //Error.logMisingSymbolSyntaxError(type, this.line);
            //this.isError = true;
            return;
        }

        while (this.runLineUntilType(others, type) == type) {
            Array.prototype.push.apply(wrapped, others);
        }
    }

    private createElement(
        op: ReactComponent,
        children: ReactNode[]
    ): ReactNode {
        return React.createElement(
            op,
            {},
            children.map((c, i) => <Fragment key={i}>{c}</Fragment>)
        );
    }

    // Flags
    private isAtEnd = () => this.current >= this.tokens.length;
}
