import React from "react";

import SpinnerWrapper from "../SpinnerWrapper";
import WordsCircle from "./WordsCircle";

export default React.memo(function () {
  return (
    <SpinnerWrapper maxSize={550} wrapperFlexGrowValue={0.6}>
      {(size) => <WordsCircle size={size} />}
    </SpinnerWrapper>
  );
});
