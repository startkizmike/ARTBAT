import React, { useMemo } from "react";
import styled from "styled-components";
import { findIndex } from "ramda";

import Wrapper from "primitives/Wrapper";
import { LinkButton, Button } from "primitives/Button";

import CircleSector from "./CircleSector";
import CircleFilter from "./CircleFilter";

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
  mediaScreen,
  marginTop,
  willChange,
  transition,
  fullHeight,
  overflow,
} from "libs/styles";
import {
  getAnglesForCountElements,
  getArcLength,
  getMatrix,
  getAngleToRotate,
  getRealAngle,
} from "libs/mathCalculationsForSpiner";
import { getRealAngleAndArithmeticSign } from "libs/decorators/wordsSpinnerHelpers";

import WordsState, { PickedWordsInterface } from "state/Words";

const wordsSpinnerImg = require("assets/images/wordsSpinPikerPlay.png");
const wordsCount = WordsState.allWords.length;

export default React.memo(function ({
  size,
  animationEnd,
  endAnimation,
  runAnimation,
  isResultReady,
  pickWords,
}: {
  size: number;
  animationEnd: boolean;
  endAnimation: () => void;
  runAnimation: () => void;
  isResultReady: boolean;
  pickWords: (words: PickedWordsInterface) => void;
}) {
  const transitionElement = React.useRef<HTMLDivElement>();
  const wordsList = useMemo(() => WordsState.getMixedList(), []);

  const segmentAngle = 360 / wordsCount;
  const radius = size / 2;

  const [rotationAngle, setRotationAngle] = React.useState(
    WordsState.rotationAngle
  );
  const angles = React.useMemo(
    () => getAnglesForCountElements(wordsCount, segmentAngle, 17.5),
    [wordsCount, segmentAngle]
  );

  React.useEffect(() => {
    const handler = () => {
      const pickedFirstWordAngle = getRealAngle(89.5 - rotationAngle);
      const pickedSecondWordAngle = getRealAngle(269.5 - rotationAngle);
      const firstPickedWordIndex = findIndex(
        (a) => a === pickedFirstWordAngle,
        angles
      );
      const secondPickedWordIndex = findIndex(
        (a) => a === pickedSecondWordAngle,
        angles
      );

      endAnimation();
      WordsState.rotationAngle = rotationAngle;
      WordsState.pickedWords = {
        noun: WordsState.getRealWord(wordsList[firstPickedWordIndex]),
        adjective: WordsState.getRealWord(wordsList[secondPickedWordIndex]),
      };
      pickWords(WordsState.pickedWords);
    };

    transitionElement.current!.addEventListener("transitionend", handler);
    return () =>
      transitionElement.current!.removeEventListener("transitionend", handler);
  }, [rotationAngle]);

  function onClick() {
    runAnimation();
    setRotationAngle(getAngleToRotate(rotationAngle, wordsCount));
  }

  return (
    <>
      <Wrapper styles={[flex, width(size), height(size), position("relative")]}>
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
          {wordsList.map((word, index) => {
            const angle = angles[index];
            const halfArcLength = getArcLength(segmentAngle + 2, radius) / 2;
            const rotateMatrix = getMatrix(
              angle,
              halfArcLength / 2,
              radius / 2
            );
            const {
              arithmeticSign,
              revertArithmeticSign,
            } = getRealAngleAndArithmeticSign(angle + rotationAngle);

            return (
              <CircleSector
                key={index}
                halfArcLength={halfArcLength}
                rotateMatrix={rotateMatrix}
                arithmeticSign={arithmeticSign}
                revertArithmeticSign={revertArithmeticSign}
                word={word}
              />
            );
          })}
        </Wrapper>
        <Wrapper
          styles={[
            position("absolute"),
            top("5%"),
            left("50%"),
            transform("translate(-50%)"),
            width(3),
            height("90%"),
            background(
              "linear-gradient(0deg, #00A9FF 0%, #FF0081 50%, #FFEA00 100%)"
            ),
            zIndex(2),
          ]}
        />
        <StyledImg src={wordsSpinnerImg} />
        <CircleFilter />
      </Wrapper>
      <Wrapper
        styles={[
          flex,
          fullWidth,
          jc(Aligns.SPACE_AROUND),
          mediaScreen("(max-height: 1100px)", marginTop(20)),
          overflow("hidden"),
        ]}
      >
        <LinkButton
          title="See the result"
          href="/result"
          disabled={!isResultReady}
        />
        <Button
          title="Spin the theme"
          onClick={onClick}
          disabled={!animationEnd}
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
  z-index: 3;
`;
