import React from "react";
import styled from "styled-components";
import { findIndex } from "ramda";

import Wrapper from "primitives/Wrapper";
import { Button } from "primitives/Button";

import CircleSector from "./CircleSector";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  flex,
  flexColumn,
  fullHeight,
  fullWidth,
  height,
  jc,
  left,
  marginTop,
  overflow,
  position,
  top,
  transform,
  transition,
  width,
  willChange,
} from "libs/styles";
import {
  getAnglesForCountElements,
  getAngleToRotate,
  getArcLength,
  getMatrix,
  getRealAngle,
} from "libs/mathCalculationsForSpiner";
import { hexToRgb, RGB } from "libs/colorParserHelper";

import ColorsState from "state/Colors";

const colorsSpinnerImg = require("assets/images/spinPiker.png");

export default React.memo(function ({
  size,
  animationEnd,
  endAnimation,
  runAnimation,
  pickColor,
}: {
  size: number;
  animationEnd: boolean;
  endAnimation: () => void;
  runAnimation: () => void;
  pickColor: (color: RGB) => void;
}) {
  const transitionElement = React.useRef<HTMLDivElement>();

  const allColors = ColorsState.allColors;
  const segmentCount = allColors.length;
  const segmentAngle = 360 / segmentCount;
  const radius = size / 2;

  const [rotationAngle, setRotationAngle] = React.useState(
    () => ColorsState.rotationAngle
  );
  const angles = React.useMemo(
    () => getAnglesForCountElements(segmentCount, segmentAngle),
    [segmentCount, segmentAngle]
  );

  React.useEffect(() => {
    const handler = () => {
      const pickedColorAngle = getRealAngle(180 - rotationAngle);
      const pickedColorIndex = findIndex((a) => a === pickedColorAngle, angles);

      endAnimation();
      ColorsState.rotationAngle = rotationAngle;
      ColorsState.pickedColor = hexToRgb(allColors[pickedColorIndex]);

      pickColor(ColorsState.pickedColor);
    };

    transitionElement.current!.addEventListener("transitionend", handler);
    return () =>
      transitionElement.current!.removeEventListener("transitionend", handler);
  }, [rotationAngle]);

  function onClick() {
    runAnimation();
    setRotationAngle(getAngleToRotate(rotationAngle, segmentCount));
  }

  return (
    <>
      <Wrapper
        styles={[flex, fullWidth, fullHeight, ai(Aligns.END), jc(Aligns.END)]}
      >
        <Wrapper styles={[flex, flexColumn]}>
          <Wrapper
            styles={[
              flex,
              width(size),
              height(size),
              position("relative"),
              borderRadius("100%"),
              overflow("hidden"),
            ]}
          >
            <Wrapper
              ref={transitionElement}
              styles={[
                fullWidth,
                fullHeight,
                willChange("transform, transition"),
                transition("transform 3s cubic-bezier(0.85, 0.01, 0.6, 1.1)"),
                transform(`rotateZ(${rotationAngle}deg)`),
              ]}
            >
              {allColors.map((color, index) => {
                const angle = angles[index];
                const halfArcLength =
                  getArcLength(segmentAngle + 2, radius) / 2;
                const rotateMatrix = getMatrix(
                  angle,
                  halfArcLength,
                  radius / 2
                );

                return (
                  <CircleSector
                    key={index}
                    halfArcLength={halfArcLength}
                    rotateMatrix={rotateMatrix}
                    color={color}
                    radius={radius}
                  />
                );
              })}
            </Wrapper>
            <Wrapper
              styles={[
                position("absolute"),
                top("50%"),
                left("50%"),
                backgroundColor("black"),
                width("60%"),
                height("60%"),
                borderRadius("100%"),
                transform("translate(-50%, -50%)"),
              ]}
            />
            <SpinPickerIcon src={colorsSpinnerImg} />
          </Wrapper>
          <Wrapper styles={[flex, fullWidth, jc(Aligns.CENTER), marginTop(35)]}>
            <Button
              title="Spin the theme"
              onClick={onClick}
              disabled={!animationEnd}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </>
  );
});

const SpinPickerIcon = styled.img`
  width: 15%;
  height: 20%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
