import { MdProps } from "./Md.types";
import { Parser, Scanner, defaultOperators } from "./objects";

export const Md = ({
  text,
  style = {},
  operators = defaultOperators,
}: MdProps) => {
  const scanner = new Scanner(text);
  const tokens = scanner.scan();

  const parser = new Parser(tokens, operators);

  const res = parser.parse();

  return <span style={style}>{res}</span>;
};
