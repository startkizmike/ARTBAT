import React from "react";

import Wrapper from "primitives/Wrapper";

import {
  background,
  fullHeight,
  fullWidth,
  left,
  position,
  top,
} from "libs/styles";

interface CircleSectorInterface {
  halfArcLength: number;
  rotateMatrix: number[];
  arithmeticSign: string;
  revertArithmeticSign: string;
  maskBackground: string;
  word: string;
}

function CircleSector({
  halfArcLength,
  rotateMatrix,
  arithmeticSign,
  revertArithmeticSign,
  maskBackground,
  word,
}: CircleSectorInterface) {
  return (
    <div
      className="word_circle_sector"
      style={{
        width: `${halfArcLength}px`,
        transform: `matrix3d(${rotateMatrix.join(", ")})`,
      }}
    >
      <p
        className="word_circle_sector_typography"
        style={{
          transform: `rotate(${arithmeticSign}90deg) translateX(${revertArithmeticSign}40%)`,
        }}
      >
        <Wrapper
          as="span"
          styles={[
            position("absolute"),
            fullWidth,
            fullHeight,
            top(0),
            left(0),
            background(maskBackground),
          ]}
        />
        {word}
      </p>
    </div>
  );
}

export default React.memo(CircleSector);
