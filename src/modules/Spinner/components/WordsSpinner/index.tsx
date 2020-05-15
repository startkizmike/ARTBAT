import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";

import {
  ai,
  Aligns,
  background,
  backgroundColor,
  flex,
  flexColumn,
  fullHeight,
  fullWidth,
  height,
  jc,
  left,
  overflow,
  padding,
  position,
  textAlign,
  top,
  transform,
  width,
  zIndex,
} from "libs/styles";
import styled from "styled-components";

const wordsSpinPikerPlay = require("assets/images/wordsSpinPikerPlay.png");

const testData = {
  nouns: ["123214", "Asfasfas", "bHASBD", "123214", "Asfasfas"],
};

export default React.memo(function ColorsSpinner() {
  return (
    <Wrapper styles={[flex, width("50%"), height(550)]}>
      <Wrapper
        styles={[
          width("45%"),
          overflow("hidden"),
          height(550),
          position("relative"),
        ]}
      >
        <Wrapper
          styles={[
            flex,
            flexColumn,
            ai(Aligns.CENTER),
            fullWidth,
            position("absolute"),
            top(0),
            left(0),
          ]}
        >
          {testData.nouns.map((word, index) => (
            <Typography
              key={index}
              type="spinnerWord"
              styles={[transform("rotate(45deg)"), padding("60px 0")]}
            >
              {word}
            </Typography>
          ))}
        </Wrapper>
      </Wrapper>
      <Wrapper styles={[position("relative"), width("10%")]}>
        <Wrapper
          styles={[
            position("absolute"),
            top(0),
            left("50%"),
            transform("translate(-50%)"),
            width(3),
            fullHeight,
            background(
              "linear-gradient(0deg, #00A9FF 0%, #FF0081 50%, #FFEA00 100%)"
            ),
            zIndex(0),
          ]}
        />
        <StyledImg src={wordsSpinPikerPlay} />
      </Wrapper>
      <Wrapper styles={[width("45%"), backgroundColor("red")]}></Wrapper>
    </Wrapper>
  );
});

const StyledImg = styled.img`
  width: 100%;
  max-height: 70px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
