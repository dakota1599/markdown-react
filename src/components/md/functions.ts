import { Operators } from "./Md.types";
import { defaultOperators } from "./objects";

export function createOperators(): Operators {
  return structuredClone(defaultOperators);
}
