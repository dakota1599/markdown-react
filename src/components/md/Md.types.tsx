import React, { Component, ReactElement, ReactNode } from "react";

export type ReactComponent = React.FunctionComponent;

export interface Operators {
    h1: ReactComponent;
    h2: ReactComponent;
    h3: ReactComponent;
    italics: ReactComponent;
    bold: ReactComponent;
    text: ReactComponent;
}

export interface MdProps {
    style?: React.CSSProperties;
    operators?: Operators;
    text: string;
}

export interface Token {
    type: TokenType;
    value: string;
}

export interface Node {
    type: TokenType;
    left: Node;
    right: Node;
    value: string;
}

export type ErrorType = "parsing" | "scanning" | "looping" | "general";

// Default Components
export const H1 = (props: React.ComponentProps<"h1">) => {
    return <h1 {...props} />;
};

export const H2 = (props: React.ComponentProps<"h2">) => {
    return <h2 {...props} />;
};

export const H3 = (props: React.ComponentProps<"h3">) => {
    return <h3 {...props} />;
};

export const Strong = (props: React.ComponentProps<"strong">) => {
    return <strong {...props} />;
};

export const Em = (props: React.ComponentProps<"em">) => {
    return <em {...props} />;
};

export const Text = (props: React.ComponentProps<"span">) => {
    return <span {...props} />;
};

// Enums
export enum TokenType {
    Text,
    Asterisk,
    Hashtag,
    Newline,
    Underscore,
    DoubleAsterisk,
    DoubleHashtag,
    TripleHashtag,
    DoubleUnderscore,
}

export enum OperatorType {
    Asterisk,
    Hashtag,
    Newline,
    Underscore,
    DoubleAsterisk,
    DoubleHashtag,
    TripleHashtag,
    DoubleUnderscore,
}

export enum NodeType {
    Text,

    AsteriskOpen,
    AsteriskClose,

    DoubleAsteriskOpen,
    DoubleAsteriskClose,

    Hashtag,
    DoubleHashtag,
    TripleHashtag,

    Newline,

    UnderscoreOpen,
    UnderscoreClose,

    DoubleUnderscoreOpen,
    DoubleUnderscoreClose,
}
