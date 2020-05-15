import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Typography from "primitives/Typography";

import { getColor, zIndex } from "libs/styles";

export default React.memo(function (props: { title: string; href: string }) {
  return (
    <StyledLink to={props.href}>
      <Typography type="buttonCaption" styles={zIndex(1)}>
        {props.title}
      </Typography>
    </StyledLink>
  );
});

const StyledLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;
  width: 265px;
  background: linear-gradient(180deg, #b5c2ca 0%, #ffffff 100%);
  border-radius: 50px;

  font-size: 30px;
  font-weight: bold;
  color: ${getColor("black")};
  text-decoration: none;

  cursor: pointer;

  :focus,
  :hover {
    outline: none;
  }

  &::after {
    position: absolute;
    content: "";
    top: 4px;
    left: 50%;
    transform: translateX(-50%);

    width: 235px;
    height: 28px;
    border-radius: 20px;
    background: linear-gradient(
      180deg,
      #f2f4ef 0%,
      rgba(242, 244, 239, 0.2) 100%
    );
    z-index: 0;
  }
`;
