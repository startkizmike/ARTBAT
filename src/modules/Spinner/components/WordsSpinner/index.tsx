import React from "react";

import SpinnerWrapper from "../SpinnerWrapper";
import WordsCircle from "./WordsCircle";

export default React.memo(function () {
  return (
    <SpinnerWrapper wrapperFlexGrowValue={0.3}>
      {(size) => <WordsCircle size={size} />}
    </SpinnerWrapper>
  );
});
