import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

const Footer = styled(Wrapper)`
  position: relative;
  display: flex;
  height: 100px;
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    #ffff00 25%,
    #00ffff 50%,
    #0000ff 75%,
    #ff0000 100%
  );
`;
const FooterMask = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 5%, #000000 100%);
  background-blend-mode: multiply;
  mix-blend-mode: multiply;
`;

export default React.memo(function ({}) {
  return (
    <Footer>
      <FooterMask />
    </Footer>
  );
});
