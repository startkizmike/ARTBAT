import React from "react";

import SpinnerWrapper from "../SpinnerWrapper";
import ColorsCircle from "./ColorsCircle";

export default React.memo(function () {
  return (
    <SpinnerWrapper>{(size) => <ColorsCircle size={size} />}</SpinnerWrapper>
  );
});
