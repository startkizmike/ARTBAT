import React from "react";

import Wrapper from "primitives/Wrapper";

import ColorsSpinner from "./components/ColorsSpinner";
import WordsSpinner from "./components/WordsSpinner";

import {
  Aligns,
  flex,
  fullWidth,
  height,
  jc,
  maxWidth,
  overflow,
  padding,
} from "libs/styles";
import { rgbToHex } from "libs/colorParserHelper";

import WordsState from "state/Words";
import ColorsState from "state/Colors";

import { useBoolean } from "libs/hooks";

function getIsResultReady() {
  if (
    WordsState.pickedWords.adjective === "" ||
    WordsState.pickedWords.noun === ""
  ) {
    return false;
  }
  return rgbToHex(ColorsState.pickedColor) !== null;
}

export default React.memo(function ({}) {
  const [pickedColor, pickColor] = React.useState(
    () => ColorsState.pickedColor
  );
  const [, pickWords] = React.useState(() => WordsState.pickedWords);
  const [
    colorCircleAnimationEnd,
    endColorCircleAnimation,
    runColorCircleAnimation,
  ] = useBoolean(true);
  const [
    wordsCircleAnimationEnd,
    endWordsCircleAnimation,
    runWordsCircleAnimation,
  ] = useBoolean(true);
  const isResultReady =
    getIsResultReady() && colorCircleAnimationEnd && wordsCircleAnimationEnd;

  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        height("100%"),
        jc(Aligns.SPACE_BETWEEN),
        maxWidth(1800),
        padding("0 0 85px"),
        overflow("hidden"),
      ]}
    >
      <ColorsSpinner
        animationEnd={colorCircleAnimationEnd}
        endAnimation={endColorCircleAnimation}
        runAnimation={runColorCircleAnimation}
        pickedColor={pickedColor}
        pickColor={pickColor}
      />
      <WordsSpinner
        animationEnd={wordsCircleAnimationEnd}
        endAnimation={endWordsCircleAnimation}
        runAnimation={runWordsCircleAnimation}
        isResultReady={isResultReady}
        pickWords={pickWords}
      />
    </Wrapper>
  );
});
