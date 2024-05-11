import { ErrorType, TokenType } from "../Md.types";

export class Error {
    static log(errorType: ErrorType, errorMessage: string) {
        console.error(`[${errorType.toUpperCase()} Error] ${errorMessage}`);
    }

    static logMisingSymbolSyntaxError(type: TokenType, line: number) {
        let sym = "";
        switch (type) {
            case TokenType.Asterisk:
                sym = "'*'";
                break;
            case TokenType.DoubleAsterisk:
                sym = "'**'";
                break;
            case TokenType.Hashtag:
                sym = "'#'";
                break;
            case TokenType.DoubleHashtag:
                sym = "'##'";
                break;
            case TokenType.TripleHashtag:
                sym = "'###'";
                break;
            case TokenType.Underscore:
                sym = "'_'";
                break;
            case TokenType.DoubleUnderscore:
                sym = "'__'";
                break;
        }

        Error.log("parsing", `Missing symbol ${sym} on line ${line}`);
    }
}
