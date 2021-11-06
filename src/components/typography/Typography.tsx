import React, { forwardRef } from "react";
import styled, { FlattenSimpleInterpolation } from "styled-components";

import { fontStyles } from "./fontsSettings";
import { generateTag, getFontFamily } from "./helpers";

import { TypographyProps } from "./interfaces";

interface ITypographyStyled {
  fontFamily: string;
  fontStyles: FlattenSimpleInterpolation;
}

const TypographyStyled = styled.div<ITypographyStyled>`
  ${({ fontFamily }) => fontFamily};
  ${({ fontStyles }) => fontStyles};
`;

const TypographyJSX = forwardRef<HTMLDivElement, TypographyProps>(
  (props, ref) => {
    const { type = "TextRegular16", as, children, className } = props;

    return (
      <TypographyStyled
        ref={ref}
        fontFamily={getFontFamily(type)}
        fontStyles={fontStyles[type]}
        as={as || generateTag(type)}
        className={className || type}
      >
        {children}
      </TypographyStyled>
    );
  }
);

export const Typography = React.memo(TypographyJSX);
