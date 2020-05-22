import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import { LinkButton } from "primitives/Button";

import {
  ai,
  Aligns,
  background,
  backgroundColor,
  borderRadius,
  flex,
  flexColumn,
  fontSize,
  fullHeight,
  fullWidth,
  height,
  jc,
  left,
  margin,
  marginTop,
  maxWidth,
  mediaScreen,
  minWidth,
  padding,
  position,
  top,
  transform,
  width,
} from "libs/styles";
import { parseNumberRgbToString } from "libs/colorParserHelper";

import WordsState from "state/Words";
import ColorsState from "state/Colors";

export default React.memo(function ({}) {
  const { adjective, noun } = WordsState.pickedWords;
  const { r, g, b } = parseNumberRgbToString(ColorsState.pickedColor);

  function onReset() {
    WordsState.clearState();
    ColorsState.clearState();
  }

  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        height("100%"),
        padding("0 80px 85px"),
        maxWidth(1600),
        jc(Aligns.SPACE_BETWEEN),
        ai(Aligns.END),
      ]}
    >
      <Circle styles={[background(`rgb(${r}, ${g}, ${b})`)]}>
        <Wrapper
          styles={[
            flex,
            jc(Aligns.CENTER),
            position("absolute"),
            top("50%"),
            left("50%"),
            minWidth("70%"),
            padding("5px 15px"),
            borderRadius(7),
            height(50),
            transform("translate(-50%, -50%)"),
            backgroundColor("black"),
          ]}
        >
          <Typography
            type="spinnerWord"
            styles={[
              fontSize("2.3rem"),
              mediaScreen("(max-width: 1600px)", fontSize("2rem")),
            ]}
          >{`R ${r} G ${g} B ${b}`}</Typography>
        </Wrapper>
      </Circle>

      <Wrapper
        styles={[width("50%"), fullHeight, flex, flexColumn, jc(Aligns.END)]}
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
          styles={[flex, fullWidth, jc(Aligns.SPACE_AROUND), marginTop("7vh")]}
        >
          <LinkButton title="Reset" href="/" onClick={onReset} />
          <LinkButton title="Spin Again" href="/spinner" />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
});

const Circle = styled(Wrapper)`
  width: 40%;
  position: relative;
  border-radius: 100%;
  margin-bottom: 8vh;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-height: 1100px) {
    width: 35%;
  }
`;
