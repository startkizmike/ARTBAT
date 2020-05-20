import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import { LinkButton } from "primitives/Button";

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
  padding,
  width,
} from "libs/styles";

import WordsState from "state/Words";
import ColorsState from "state/Colors";
import styled from "styled-components";

export default React.memo(function ({}) {
  // const { adjective, noun } = WordsState.pickedWords; TODO - real values
  const { adjective, noun } = { adjective: "Sheltering", noun: "Paws" };
  // const color = ColorsState.pickedColor; TODO - real values
  const color = { r: 80, g: 200, b: 130 };
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
      <Circle styles={[background(`rgb(${color.r}, ${color.g}, ${color.b})`)]}>
        <Typography type="spinnerWord">{`R ${color.r} G ${color.g} B ${color.b}`}</Typography>
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
          <LinkButton title="Reset" href="/" />
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
