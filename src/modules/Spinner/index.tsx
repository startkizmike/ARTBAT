import React from "react";

import Wrapper from "primitives/Wrapper";

import ColorsSpinner from "./components/ColorsSpinner";
import WordsSpinner from "./components/WordsSpinner";

import { Aligns, flex, fullHeight, fullWidth, jc } from "libs/styles";

export default React.memo(function (props: any) {
  return (
    <Wrapper styles={[flex, fullWidth, fullHeight, jc(Aligns.SPACE_BETWEEN)]}>
      <ColorsSpinner />
      {/*<WordsSpinner />*/}
    </Wrapper>
  );
});
