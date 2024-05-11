import {
    Em,
    H1,
    H2,
    H3,
    Operators,
    OperatorType,
    Strong,
    Text,
} from "../Md.types";

// export const defaultOperators: Operator[] = [
//   { name: OperatorType.Asterisk, component: <i /> },
//   { name: OperatorType.DoubleAsterisk, component: <strong /> },
//   { name: OperatorType.Hashtag, component: <h1 /> },
//   { name: OperatorType.DoubleHashtag, component: <h2 /> },
//   { name: OperatorType.TripleHashtag, component: <h3 /> },
//   { name: OperatorType.Newline, component: <br /> },
//   { name: OperatorType.DoubleUnderscore, component: <i /> },
// ];

export const defaultOperators: Operators = {
    h1: H1,
    h2: H2,
    h3: H3,
    italics: Em,
    bold: Strong,
    text: Text,
};
