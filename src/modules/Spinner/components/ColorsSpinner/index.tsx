import React from "react";

import SpinnerWrapper from "../SpinnerWrapper";
import ColorsCircle from "./ColorsCircle";

import { RGB } from "libs/colorParserHelper";

export default React.memo(function (props: {
  pickedColor: RGB;
  animationEnd: boolean;
  endAnimation: () => void;
  runAnimation: () => void;
  pickColor: (color: RGB) => void;
}) {
  return (
    <SpinnerWrapper>
      {(size) => <ColorsCircle size={size} {...props} />}
    </SpinnerWrapper>
  );
});
