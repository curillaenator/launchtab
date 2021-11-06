import React, { FC } from "react";
import styled from "styled-components";

import { Typography, ITypographyTypes } from "../typography";

const TitlewrapStyled = styled.div`
  .titlewrap-title {
    margin-bottom: 1rem;
  }
`;

interface ITitlewrap {
  title: string;
  titleType?: ITypographyTypes;
  className?: string;
}

export const Titlewrap: FC<ITitlewrap> = ({
  title,
  titleType = "RoundedBold20",
  children,
  className,
}) => {
  return (
    <TitlewrapStyled className={className || "titlewrap"}>
      <Typography type={titleType} className="titlewrap-title">
        {title}
      </Typography>

      {children}
    </TitlewrapStyled>
  );
};
