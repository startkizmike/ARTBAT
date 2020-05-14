import React, { ReactNode } from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  flex,
  flexBasis,
  flexColumn,
  marginBottom,
  maxWidth,
} from "libs/styles";

export default React.memo(
  ({
     title,
     basis,
     children
   }: {
    title: string;
    basis: string;
    children?: ReactNode;
  }) => (
    <Wrapper
      styles={[
        flex,
        flexColumn,
        flexBasis(basis),
        maxWidth(300),
        ai(Aligns.CENTER),
      ]}
    >
      <Typography type="subTitle" styles={marginBottom(15)}>
        {title}
      </Typography>
      {children}
    </Wrapper>
  )
);
