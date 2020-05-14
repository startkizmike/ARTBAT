import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { getColor } from "libs/styles";

export default React.memo(function (props: { title: string; href: string }) {
  return <StyledLink to={props.href}>{props.title}</StyledLink>;
});

const StyledLink = styled(Link)`
  display: block;
  color: ${getColor("black")};
  padding: 8px 50px;
  background-color: ${getColor("white")};
  max-width: 200px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;

  :focus,
  :hover {
    outline: none;
  }
`;
