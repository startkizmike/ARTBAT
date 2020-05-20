import React, { useMemo } from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import { LinkButton, Button } from "primitives/Button";

import CircleSector from "./CircleSector";

import {
  flex,
  height,
  position,
  transform,
  width,
  top,
  left,
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
  getRandomInteger,
  wordsValidAngles,
} from "libs/mathCalculationsForSpiner";
import {
  getRealAngleAndArithmeticSign,
  getWordMaskBackgroundByRealAngle,
} from "libs/decorators/wordsSpinnerHelpers";

import WordsState from "state/Words";

const wordsSpinnerImg = require("assets/images/wordsSpinPikerPlay.png");

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

function getMixedWordsList() {
  const mixedWordsList = [];

  for (let i = 0; i < wordsCount / 2; i++) {
    mixedWordsList.push(testData.adjectives[i], testData.nouns[i]);
  }

  return mixedWordsList;
}

export default React.memo(function ({ size }: { size: number }) {
  const segmentAngle = 360 / wordsCount;
  const [angles, setAngles] = React.useState(() =>
    getAnglesForCountElements(wordsCount, segmentAngle, 17.5)
  );
  const radius = size / 2;

  function onClick() {
    const randomInteger = getRandomInteger(3, 7);
    WordsState.spinner.onSpin(
      {
        validAngles: wordsValidAngles,
        startAngle: 17.5,
        speedFactor: randomInteger,
        animateTime: randomInteger,
      },
      (startAngle: number) => {
        setAngles(
          getAnglesForCountElements(wordsCount, segmentAngle, startAngle)
        );
      }
    );
  }

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
          const maskBackground = getWordMaskBackgroundByRealAngle(realAngle);

          return (
            <CircleSector
              key={index}
              halfArcLength={halfArcLength}
              rotateMatrix={rotateMatrix}
              arithmeticSign={arithmeticSign}
              revertArithmeticSign={revertArithmeticSign}
              maskBackground={maskBackground}
              word={word}
            />
          );
        })}
        <Wrapper
          styles={[
            position("absolute"),
            top(0),
            left("50%"),
            transform("translate(-50%)"),
            width(3),
            height("calc(100% + 30px)"),
            background(
              "linear-gradient(0deg, #00A9FF 0%, #FF0081 50%, #FFEA00 100%)"
            ),
            zIndex(0),
          ]}
        />
        <StyledImg src={wordsSpinnerImg} />
      </Wrapper>
      <Wrapper styles={[flex, fullWidth, jc(Aligns.SPACE_AROUND)]}>
        <LinkButton title="See the result" href="/result" />
        <Button title="Spin the theme" onClick={onClick} />
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
