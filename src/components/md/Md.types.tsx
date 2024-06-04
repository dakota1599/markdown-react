import React, { Component, ReactElement, ReactNode } from "react";

export type ReactComponent = React.FunctionComponent;

export interface Operators {
  h1: ReactComponent;
  h2: ReactComponent;
  h3: ReactComponent;
  italics: ReactComponent;
  bold: ReactComponent;
  text: ReactComponent;
  blockquote: ReactComponent;
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

export const Blockquote = (props: React.ComponentProps<"blockquote">) => {
  const { style, ...p } = props;
  return (
    <blockquote
      {...p}
      style={{
        borderLeft: "5px solid darkgray",
        background: "lightgray",
        borderRadius: "2px",
        paddingLeft: "2px",
        margin: "1rem",
      }}
    />
  );
};

// Enums
export enum TokenType {
  None,
  Text,
  Asterisk,
  Hashtag,
  Newline,
  Underscore,
  DoubleAsterisk,
  DoubleHashtag,
  TripleHashtag,
  DoubleUnderscore,
  Caret,
}
