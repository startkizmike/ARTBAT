import React from "react";
// @ts-ignore
import { Matrix, Transform } from "webgl-math";

import Wrapper from "primitives/Wrapper";

import {
  borderRadius,
  Colors,
  flex,
  height,
  position,
  transform,
  width,
  backgroundColor,
  overflow,
  transition,
  borderLeftWidth,
  borderRightWidth,
  borderColor,
  borderTopWidth,
  left,
  top,
} from "libs/styles";

import State from "state";
import styled from "styled-components";

const spinPickerUrl = require("assets/images/spinPiker.png");

const testData = [
  "#FF550A",
  "#FF9B05",
  "#FFFF32",
  "#64AF32",
  "#0591CD",
  "#0046FF",
  "#3C00A5",
  "#8700AF",
  "#A5194B",
  "#FF2814",
];

function getArcLength(angle: number, radius: number) {
  return (Math.PI * angle * radius) / 180;
}

function getAnglesForCountElements(
  count: number,
  segmentAngle: number,
  startAngle = 0
) {
  const angles: number[] = [];

  for (let i = 0; i < count; i++) {
    angles.push(startAngle + segmentAngle * i);
  }

  return angles;
}

function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function getMatrix(angle: number, halfArcLength: number, radiusHalf: number) {
  const identityMatrix = Matrix.idendity(4);

  const horizontalCenterMatrix = Transform.translate(
    identityMatrix,
    Float32Array.of(-halfArcLength, 0, 0)
  );

  const rotatedMatrix = Transform.rotate(
    horizontalCenterMatrix,
    radians(angle),
    Float32Array.of(0, 0, 1)
  );

  const translatedRotateCenterMatrix = Matrix.multiply(
    rotatedMatrix,
    Transform.translate(identityMatrix, Float32Array.of(0, -radiusHalf, 0))
  );

  return Matrix.multiply(
    Transform.translate(identityMatrix, Float32Array.of(0, -radiusHalf, 0)),
    translatedRotateCenterMatrix
  );
}

export default React.memo(function ({ size }: { size: number }) {
  const [pickedColor, pickColor] = React.useState(() => State.allColors[0]!);
  const segmentCount = testData.length;
  const segmentAngle = 360 / segmentCount;
  const [angles, setAngles] = React.useState(() =>
    getAnglesForCountElements(segmentCount, segmentAngle)
  );
  const radius = size / 2;

  React.useEffect(() => {
    let startAngle = 0;
    setInterval(() => {
      startAngle += 5;
      setAngles(
        getAnglesForCountElements(segmentCount, segmentAngle, startAngle)
      );
    }, 100);
  }, []);

  return (
    <Wrapper
      styles={[
        flex,
        width(size),
        height(size),
        position("relative"),
        backgroundColor("gray"),
        borderRadius("100%"),
        overflow("hidden"),
        transition("transform 0.3s ease 0"),
      ]}
    >
      {testData.map((color, index) => {
        const angle = angles[index];
        const halfArcLength = getArcLength(segmentAngle + 2, radius) / 2;
        const rotateMatrix = getMatrix(angle, halfArcLength, radius / 2);

        return (
          <CircleSector
            key={index}
            styles={[
              borderColor(color as Colors),
              borderTopWidth(radius),
              borderLeftWidth(halfArcLength),
              borderRightWidth(halfArcLength),
              transform(`matrix3d(${rotateMatrix.join(", ")})`),
            ]}
          />
        );
      })}
      <Wrapper
        styles={[
          position("absolute"),
          top("50%"),
          left("50%"),
          backgroundColor("black"),
          width("70%"),
          height("70%"),
          borderRadius("100%"),
          transform("translate(-50%, -50%)"),
        ]}
      />
      <SpinPickerIcon src={spinPickerUrl} />
    </Wrapper>
  );
});

const CircleSector = styled(Wrapper)`
  width: 0;
  height: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  border-style: solid;
  border-right-color: transparent;
  border-left-color: transparent;
`;

const SpinPickerIcon = styled.img`
  width: 17%;
  height: 23%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
