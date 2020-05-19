import React from "react";
import styled from "styled-components";

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
import {
  getAnglesForCountElements,
  getArcLength,
  getMatrix,
} from "libs/mathCalculationsForSpiner";

import State from "state";

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

const msInOneUnit = 1 / 60;

export default React.memo(function ({ size }: { size: number }) {
  const [pickedColor, pickColor] = React.useState(() => State.allColors[0]!);
  const segmentCount = testData.length;
  const segmentAngle = 360 / segmentCount;
  const [angles, setAngles] = React.useState(() =>
    getAnglesForCountElements(segmentCount, segmentAngle)
  );
  const radius = size / 2;

  const requestRef = React.useRef<number>();
  const startAngleRef = React.useRef(0);
  const previewTimeRef = React.useRef<number>();

  const animate = (time: number) => {
    if (!previewTimeRef.current) {
      previewTimeRef.current = time;
    }

    const deltaTime = (time - previewTimeRef.current!) / 1000;
    const speed = Math.floor(deltaTime / msInOneUnit);

    startAngleRef.current += speed * 1;
    previewTimeRef.current = time;
    // speedFactorRef.current -= 0.5;

    setAngles(
      getAnglesForCountElements(
        segmentCount,
        segmentAngle,
        startAngleRef.current
      )
    );
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
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
      <SpinPickerIcon src={spinPickerUrl} />
    </Wrapper>
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
