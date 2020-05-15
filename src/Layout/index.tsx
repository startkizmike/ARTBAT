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
  padding,
  paddingTop,
  width,
} from "libs/styles";

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
        styles={[flex, paddingTop(75), jc(Aligns.CENTER), ai(Aligns.CENTER)]}
      >
        <img src={logoUrl} alt="artbat" />
      </Wrapper>
      <Wrapper
        styles={[
          flex,
          flexGrow(1),
          jc(Aligns.CENTER),
          ai(Aligns.CENTER),
          padding("10vh 0"),
        ]}
      >
        {props.children}
      </Wrapper>
      <Footer />
    </Wrapper>
  );
});
