import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import {
  borderColor,
  borderLeftWidth,
  borderRightWidth,
  borderTopWidth,
  Colors,
  transform,
} from "libs/styles";

interface CircleSectorInterface {
  halfArcLength: number;
  rotateMatrix: number[];
  color: string;
  radius: number;
}

function CircleSector({
  halfArcLength,
  rotateMatrix,
  color,
  radius,
}: CircleSectorInterface) {
  return (
    <StyledCircleSector
      styles={[
        borderColor(color as Colors),
        borderTopWidth(radius),
        borderLeftWidth(halfArcLength),
        borderRightWidth(halfArcLength),
        transform(`matrix3d(${rotateMatrix.join(", ")})`),
      ]}
    />
  );
}

const StyledCircleSector = styled(Wrapper)`
  will-change: transform;
  width: 0;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  border-style: solid;
  border-right-color: transparent !important;
  border-left-color: transparent !important;
`;

export default React.memo(CircleSector);
