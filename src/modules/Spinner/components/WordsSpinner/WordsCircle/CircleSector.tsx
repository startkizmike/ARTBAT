import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import { mediaScreen, transform, width } from "libs/styles";

interface CircleSectorInterface {
  halfArcLength: number;
  rotateMatrix: number[];
  arithmeticSign: string;
  revertArithmeticSign: string;
  word: string;
}

function prepareWord(word: string) {
  if (word.length > 8) return `${word.slice(0, 9)}..`;
  return word;
}

function CircleSector({
  halfArcLength,
  rotateMatrix,
  arithmeticSign,
  revertArithmeticSign,
  word,
}: CircleSectorInterface) {
  return (
    <StyledCircleSector
      styles={[
        width(halfArcLength),
        transform(`matrix3d(${rotateMatrix.join(", ")})`),
      ]}
    >
      <StyledTypography
        type="spinnerWord"
        styles={[
          transform(
            `rotate(${arithmeticSign}90deg) translateX(${revertArithmeticSign}30%)`
          ),
          mediaScreen(
            "(max-width: 1500px), (max-height: 1100px)",
            transform(
              `rotate(${arithmeticSign}90deg) translateX(${revertArithmeticSign}20%)`
            )
          ),
        ]}
      >
        {prepareWord(word)}
      </StyledTypography>
    </StyledCircleSector>
  );
}

const StyledCircleSector = styled(Wrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  will-change: transform;
`;

const StyledTypography = styled(Typography)`
  will-change: transform, transition;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 3rem;
  font-weight: 600;
  line-height: 63px;

  @media screen and (max-width: 1500px), (max-height: 1100px) {
    font-size: 2rem;
  }
`;

export default React.memo(CircleSector);
