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
  padding,
} from "libs/styles";

export default React.memo(function ({}) {
  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        height("100%"),
        jc(Aligns.SPACE_BETWEEN),
        maxWidth(1600),
        padding("0 0 85px"),
      ]}
    >
      <ColorsSpinner />
      <WordsSpinner />
    </Wrapper>
  );
});
