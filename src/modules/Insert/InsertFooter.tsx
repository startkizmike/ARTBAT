import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import {LinkButton} from "primitives/Button";

import {
  ai,
  Aligns,
  background,
  flex,
  flexBasis,
  fullWidth,
  height,
  jc,
  maxWidth,
  position,
  top
} from "libs/styles";

export default React.memo(function () {
return (<Wrapper
  styles={[
    flex,
    fullWidth,
    height("20%"),
    jc(Aligns.SPACE_BETWEEN),
    ai(Aligns.END),
    position("relative"),
  ]}
>
  <Wrapper
    styles={[
      position("absolute"),
      fullWidth,
      height(32),
      top(-32),
      background(
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)"
      ),
    ]}
  />
  <Wrapper
    styles={[
      flex,
      flexBasis("30%"),
      jc(Aligns.CENTER),
      ai(Aligns.CENTER),
      maxWidth(300),
    ]}
  >
    <Typography type="normalCaption" color="white">
      RGB OR HEX
    </Typography>
  </Wrapper>
  <Wrapper
    styles={[
      flex,
      flexBasis("65%"),
      jc(Aligns.CENTER),
      ai(Aligns.CENTER),
    ]}
  >
    <LinkButton title="submit" href="/spinner" />
  </Wrapper>
</Wrapper>)
})
