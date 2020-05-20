import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import { Button } from "primitives/Button";

import {
  borderRadius,
  flex,
  height,
  position,
  transform,
  width,
  backgroundColor,
  overflow,
  transition,
  left,
  top,
  fullWidth,
  jc,
  Aligns,
} from "libs/styles";
import {
  colorsValidAngles,
  getAnglesForCountElements,
  getArcLength,
  getMatrix,
  getRandomInteger,
} from "libs/mathCalculationsForSpiner";

import ColorsState from "state/Colors";

const colorsSpinnerImg = require("assets/images/spinPiker.png");

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

export default React.memo(function ({ size }: { size: number }) {
  const segmentCount = testData.length;
  const segmentAngle = 360 / segmentCount;
  const [angles, setAngles] = React.useState(() =>
    getAnglesForCountElements(segmentCount, segmentAngle)
  );
  const radius = size / 2;

  function onClick() {
    const randomInteger = getRandomInteger(4, 13);
    ColorsState.spinner.onSpin(
      {
        validAngles: colorsValidAngles,
        speedFactor: randomInteger,
        animateTime: randomInteger,
      },
      (startAngle: number) => {
        setAngles(
          getAnglesForCountElements(segmentCount, segmentAngle, startAngle)
        );
      }
    );
  }

  return (
    <>
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
            <div
              key={index}
              className="color_circle_sector"
              style={{
                borderColor: color,
                borderTopWidth: `${radius}px`,
                borderLeftWidth: `${halfArcLength}px`,
                borderRightWidth: `${halfArcLength}px`,
                transform: `matrix3d(${rotateMatrix.join(", ")})`,
              }}
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
        <SpinPickerIcon src={colorsSpinnerImg} />
      </Wrapper>
      <Wrapper styles={[flex, fullWidth, jc(Aligns.SPACE_AROUND)]}>
        <Button title="Spin the theme" onClick={onClick} />
      </Wrapper>
    </>
  );
});

const SpinPickerIcon = styled.img`
  width: 17%;
  height: 23%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
