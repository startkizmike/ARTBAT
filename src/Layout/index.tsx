import React, { ReactNode } from "react";

import Wrapper from "primitives/Wrapper";

import Footer from "./Footer";

import {
  ai,
  Aligns,
  backgroundColor,
  flex,
  flexColumn,
  flexGrow,
  height,
  jc,
  minHeight,
  padding,
  paddingTop,
  width,
} from "libs/styles";
import styled from "styled-components";

const logoUrl = require("assets/images/logo.png");

export default React.memo(function (props: { children?: ReactNode }) {
  return (
    <Wrapper
      styles={[
        flex,
        flexColumn,
        width("100vw"),
        height("100vh"),
        backgroundColor("black"),
      ]}
    >
      <Wrapper
        styles={[
          flex,
          height("19.5vh"),
          paddingTop(75),
          jc(Aligns.CENTER),
          ai(Aligns.CENTER),
        ]}
      >
        <StyledImage src={logoUrl} alt="artbat" />
      </Wrapper>
      <Wrapper
        styles={[
          flex,
          flexGrow(1),
          jc(Aligns.CENTER),
          ai(Aligns.CENTER),
          padding("0"),
          minHeight("71.3vh"),
        ]}
      >
        {props.children}
      </Wrapper>
      <Footer />
    </Wrapper>
  );
});

const StyledImage = styled.img`
  width: 360px;
  height: 60px;
`;
