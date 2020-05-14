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
  fullHeight,
  jc,
  paddingTop,
} from "libs/styles";

const logo = require("assets/images/logo.png");

export default React.memo(function (props: { children?: ReactNode }) {
  return (
    <Wrapper styles={[flex, flexColumn, fullHeight, backgroundColor("black")]}>
      <Wrapper
        styles={[flex, paddingTop(75), jc(Aligns.CENTER), ai(Aligns.CENTER)]}
      >
        <img src={logo} alt="artbat" />
      </Wrapper>
      <Wrapper
        styles={[flex, flexGrow(1), jc(Aligns.CENTER), ai(Aligns.CENTER)]}
      >
        {props.children}
      </Wrapper>
      <Footer />
    </Wrapper>
  );
});
