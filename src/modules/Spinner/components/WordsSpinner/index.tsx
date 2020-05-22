import React from "react";

import SpinnerWrapper from "../SpinnerWrapper";
import WordsCircle from "./WordsCircle";

import { PickedWordsInterface } from "state/Words";

export default React.memo(function (props: {
  isResultReady: boolean;
  animationEnd: boolean;
  endAnimation: () => void;
  runAnimation: () => void;
  pickWords: (words: PickedWordsInterface) => void;
}) {
  return (
    <SpinnerWrapper wrapperFlexGrowValue={0.6}>
      {(size) => <WordsCircle size={size} {...props} />}
    </SpinnerWrapper>
  );
});
