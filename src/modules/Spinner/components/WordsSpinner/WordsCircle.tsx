import React, { useMemo } from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import { LinkButton, Button } from "primitives/Button";

import {
  flex,
  height,
  position,
  transform,
  width,
  transition,
  opacity,
  willChange,
  mediaScreen,
  fontSize,
  top,
  left,
  fullHeight,
  background,
  zIndex,
  fullWidth,
  jc,
  Aligns,
} from "libs/styles";
import {
  getAnglesForCountElements,
  getArcLength,
  getMatrix,
} from "libs/mathCalculationsForSpiner";
import {
  getRealAngleAndArithmeticSign,
  getWordOpacityByRealAngle,
} from "libs/decorators/wordsSpinnerHelpers";

const wordsSpinPikerPlay = require("assets/images/wordsSpinPikerPlay.png");

const testData = {
  nouns: ["Kangaroo", "Paws", "Forest", "Game", "Camping"],
  adjectives: [
    "Comforting",
    "Sheltering",
    "Scorched",
    "Satisfactory",
    "Improperly",
  ],
};

const wordsCount = testData.adjectives.length + testData.nouns.length;

const getMixedWordsList = () => {
  const mixedWordsList = [];

  for (let i = 0; i < wordsCount / 2; i++) {
    mixedWordsList.push(testData.adjectives[i], testData.nouns[i]);
  }

  return mixedWordsList;
};

const msInOneUnit = 1 / 60;

export default React.memo(function ({ size }: { size: number }) {
  const segmentAngle = 360 / wordsCount;
  const [angles, setAngles] = React.useState(() =>
    getAnglesForCountElements(wordsCount, segmentAngle, 17.5)
  );
  const radius = size / 2;

  const requestRef = React.useRef<number>();
  const startAngleRef = React.useRef(0);
  const previewTimeRef = React.useRef<number>();
  const spinTimerRef = React.useRef(0);
  const speedFactorRef = React.useRef(1);

  const animate = (time: number) => {
    if (!previewTimeRef.current) {
      previewTimeRef.current = time;
    }
    if (spinTimerRef.current <= 0) return;

    const deltaTime = (time - previewTimeRef.current!) / 1000;
    const speed = Math.floor(deltaTime / msInOneUnit);

    startAngleRef.current += speed * 2 * speedFactorRef.current;
    previewTimeRef.current = time;
    spinTimerRef.current -= deltaTime;
    // speedFactorRef.current -= 0.5;

    setAngles(
      getAnglesForCountElements(wordsCount, segmentAngle, startAngleRef.current)
    );
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <>
      <Wrapper styles={[flex, width(size), height(size), position("relative")]}>
        {getMixedWordsList().map((word, index) => {
          const angle = angles[index];
          const halfArcLength = useMemo(
            () => getArcLength(segmentAngle + 2, radius) / 2,
            [segmentAngle, radius]
          );
          const rotateMatrix = getMatrix(angle, halfArcLength / 2, radius / 2);
          const {
            realAngle,
            arithmeticSign,
            revertArithmeticSign,
          } = getRealAngleAndArithmeticSign(angle);
          const wordOpacity = getWordOpacityByRealAngle(realAngle);

          return (
            <div
              key={index}
              className="word_circle_sector"
              style={{
                width: `${halfArcLength}px`,
                transform: `matrix3d(${rotateMatrix.join(", ")})`,
              }}
            >
              <Typography
                type="spinnerWord"
                styles={[
                  willChange("opacity, transform, transition"),
                  opacity(wordOpacity),
                  transition("opacity 0.2s easy"),
                  transform(
                    `rotate(${arithmeticSign}90deg) translateX(${revertArithmeticSign}40%)`
                  ),
                  mediaScreen("(max-width: 1500px)", fontSize("2rem")),
                ]}
              >
                {word}
              </Typography>
            </div>
          );
        })}
        <Wrapper
          styles={[
            position("absolute"),
            top(0),
            left("50%"),
            transform("translate(-50%)"),
            width(3),
            fullHeight,
            background(
              "linear-gradient(0deg, #00A9FF 0%, #FF0081 50%, #FFEA00 100%)"
            ),
            zIndex(0),
          ]}
        />
        <StyledImg src={wordsSpinPikerPlay} />
      </Wrapper>
      <Wrapper styles={[flex, fullWidth, jc(Aligns.SPACE_AROUND)]}>
        <LinkButton title="See the result" href="/result" />
        <Button
          title="Spin the theme"
          onClick={() => {
            startAngleRef.current = 0;
            previewTimeRef.current = undefined;
            spinTimerRef.current = 0;
            speedFactorRef.current = 1;
            spinTimerRef.current = Math.random() * 2;
            speedFactorRef.current = Math.floor(Math.random() * 100);
            requestRef.current = requestAnimationFrame(animate);
          }}
        />
      </Wrapper>
    </>
  );
});

const StyledImg = styled.img`
  width: 17%;
  max-height: 13.5%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
