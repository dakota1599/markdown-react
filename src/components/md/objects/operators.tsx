import {
    Blockquote,
    Em,
    H1,
    H2,
    H3,
    Operators,
    Strong,
    Text,
} from "../Md.types";

export const defaultOperators: Operators = {
    h1: H1,
    h2: H2,
    h3: H3,
    italics: Em,
    bold: Strong,
    text: Text,
    blockquote: Blockquote
};
