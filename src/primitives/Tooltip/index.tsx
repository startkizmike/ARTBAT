import React, { ReactNode } from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  Aligns,
  backgroundColor,
  borderRadius,
  flex,
  hover,
  jc,
  left,
  mediaScreen,
  opacity,
  padding,
  position,
  stylesForSelector,
  top,
  transition,
  width,
  willChange,
} from "libs/styles";

export default React.memo(function (props: {
  message: string;
  children: ReactNode;
}) {
  return (
    <Wrapper
      styles={[
        position("relative"),
        hover(stylesForSelector(".tooltip_message", opacity("1"))),
      ]}
    >
      <Wrapper
        className="tooltip_message"
        styles={[
          willChange("opacity"),
          transition("opacity 0.3s"),
          flex,
          width("110%"),
          padding("7px 10px"),
          jc(Aligns.CENTER),
          top("-100%"),
          left("-5%"),
          position("absolute"),
          backgroundColor("tooltip"),
          borderRadius(8),
          opacity("0"),
          mediaScreen(
            "(max-width: 1500px), (max-height: 1100px)",
            top("-150%")
          ),
        ]}
      >
        <Typography type="tooltip">{props.message}</Typography>
      </Wrapper>
      {props.children}
    </Wrapper>
  );
});
