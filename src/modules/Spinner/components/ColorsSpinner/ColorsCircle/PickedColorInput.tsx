import React from "react";
import styled from "styled-components";

import Typography from "primitives/Typography";
import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  flex,
  marginRight,
} from "libs/styles";
import { getValidColorValue } from "libs/colorParserHelper";

export default React.memo(function ({
  title,
  colorValue,
}: {
  title: string;
  colorValue: number;
}) {
  return (
    <Wrapper styles={[flex, ai(Aligns.END), marginRight(5)]}>
      <StyledTypography
        type="buttonCaption"
        color="white"
        styles={marginRight(3)}
      >
        {title}
      </StyledTypography>
      <Wrapper>
        <StyledTypography type="buttonCaption" color="white">
          {getValidColorValue(colorValue)}
        </StyledTypography>
      </Wrapper>
    </Wrapper>
  );
});

const StyledTypography = styled(Typography)`
  font-size: 1.3rem;
`;
