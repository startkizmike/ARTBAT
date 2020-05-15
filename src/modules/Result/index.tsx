import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import LinkButton from "primitives/LinkButton";

import {
  ai,
  Aligns,
  background,
  flex,
  flexColumn,
  fullHeight,
  fullWidth,
  height,
  jc,
  margin,
  marginTop,
  maxWidth,
  width,
} from "libs/styles";

import State from "state";

export default React.memo(function (props: any) {
  const { color, adjective, noun } = State.pickedData;
  return (
    <Wrapper styles={[fullWidth, fullHeight, flex, jc(Aligns.SPACE_BETWEEN)]}>
      <Wrapper styles={[width("35%"), maxWidth(620), fullHeight]}>
        <svg width="100%" height="100%">
          <circle
            r="40%"
            cx="50%"
            cy="50%"
            fill={`rgb(${color.r}, ${color.g}, ${color.b})`}
          />
        </svg>
      </Wrapper>

      <Wrapper
        styles={[width("50%"), fullHeight, flex, flexColumn, jc(Aligns.CENTER)]}
      >
        <Wrapper styles={[fullWidth, flex, flexColumn, ai(Aligns.CENTER)]}>
          <Typography type="spinnerWord">Adjective</Typography>
          <Typography type="title">{adjective}</Typography>
        </Wrapper>
        <Wrapper
          styles={[
            fullWidth,
            flex,
            height(3),
            margin("20px 0 30px"),
            background(
              "linear-gradient(90deg, #00A9FF 0%, #FF0081 50%, #FFEA00 100%);"
            ),
          ]}
        />
        <Wrapper styles={[fullWidth, flex, flexColumn, ai(Aligns.CENTER)]}>
          <Typography type="spinnerWord">Noun</Typography>
          <Typography type="title">{noun}</Typography>
        </Wrapper>
        <Wrapper
          styles={[flex, fullWidth, jc(Aligns.SPACE_AROUND), marginTop(45)]}
        >
          <LinkButton title="Reset" href="/" />
          <LinkButton title="Spin Again" href="/spinner" />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
});
