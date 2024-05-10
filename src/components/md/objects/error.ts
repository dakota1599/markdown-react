import { ErrorType } from "../Md.types";

export class Error {
  static log(errorType: ErrorType, errorMessage: string) {
    console.error(`[${errorType.toUpperCase()} Error] ${errorMessage}`);
  }
}
