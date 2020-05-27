import React from "react";

import Wrapper from "primitives/Wrapper";
import Typography from "primitives/Typography";
import Tooltip from "primitives/Tooltip";
import { LinkButton } from "primitives/Button";

import {
  ai,
  Aligns,
  flex,
  flexBasis,
  fullWidth,
  jc,
  marginTop,
  maxWidth,
  position,
} from "libs/styles";

export default React.memo(function (props: { submitButtonDisabled: boolean }) {
  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        jc(Aligns.SPACE_BETWEEN),
        ai(Aligns.END),
        marginTop(50),
        position("relative"),
      ]}
    >
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
        styles={[flex, flexBasis("65%"), jc(Aligns.CENTER), ai(Aligns.CENTER)]}
      >
        <Tooltip message="Incomplete information or missing fills">
          <LinkButton
            title="submit"
            href="/spinner"
            disabled={props.submitButtonDisabled}
          />
        </Tooltip>
      </Wrapper>
    </Wrapper>
  );
});
