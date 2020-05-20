import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Typography from "primitives/Typography";

import { fontSize, getColor, mediaScreen, zIndex } from "libs/styles";

export const LinkButton = React.memo(function (props: {
  title: string;
  href: string;
}) {
  return (
    <Link to={props.href} style={{ textDecoration: "none" }}>
      <StyledButton>
        <Typography
          type="buttonCaption"
          styles={[
            zIndex(1),
            mediaScreen("(max-width: 1500px)", fontSize("1rem")),
          ]}
        >
          {props.title}
        </Typography>
      </StyledButton>
    </Link>
  );
});

export const Button = React.memo(function (props: {
  title: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <StyledButton onClick={props.onClick} disabled={props.disabled}>
      <Typography
        type="buttonCaption"
        styles={[
          zIndex(1),
          mediaScreen("(max-width: 1500px)", fontSize("1rem")),
        ]}
      >
        {props.title}
      </Typography>
    </StyledButton>
  );
});

const StyledButton = styled.button`
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

  @media screen and (max-width: 1500px) {
    height: 40px;
    width: 175px;
    &::after {
      width: 155px;
      height: 18px;
    }
  }
`;
