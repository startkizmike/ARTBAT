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
  mediaScreen,
  padding,
} from "libs/styles";

export default React.memo(function ({}) {
  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        height("90%"),
        jc(Aligns.SPACE_BETWEEN),
        padding("0 8.8% 0 5.2%"),
        mediaScreen("(max-width: 1500px)", height("70%")),
      ]}
    >
      <ColorsSpinner />
      <WordsSpinner />
    </Wrapper>
  );
});
