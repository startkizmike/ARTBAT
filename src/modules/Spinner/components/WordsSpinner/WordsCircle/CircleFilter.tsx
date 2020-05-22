import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import { bottom, left, right, top, transform } from "libs/styles";

export default React.memo(function () {
  return (
    <>
      <Filter styles={[top(0), left(0)]} />
      <Filter
        styles={[top(0), right(0), transform("matrix(-1, 0, 0, 1, 0, 0)")]}
      />
      <Filter styles={[bottom(0), right(0), transform("rotate(-180deg)")]} />
      <Filter
        styles={[bottom(0), left(0), transform("matrix(1, 0, 0, -1, 0, 0)")]}
      />
      <Cap styles={[top("-40%"), left(0)]} />
      <Cap styles={[bottom("-40%"), left(0)]} />
    </>
  );
});

const Filter = styled(Wrapper)`
  width: calc(50% + 3px);
  height: 50%;
  position: absolute;
  background: linear-gradient(
    213.62deg,
    #000000 53.87%,
    rgba(0, 0, 0, 0) 71.3%
  );
  z-index: 1;
`;

const Cap = styled(Wrapper)`
  width: 100%;
  height: 50%;
  background-color: black;
  position: absolute;
`;
