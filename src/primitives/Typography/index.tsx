import React, { ReactNode } from "react";
import styled from "styled-components/macro";

import {
  ai,
  Aligns,
  color,
  Colors,
  flex,
  fontSize,
  fontWeight,
  lineHeight,
  noWrapText,
  overflow,
  getColor,
  display,
  pointer,
  textOverflow,
} from "libs/styles";

function getOnlyTypographyProps({
  children,
  className,
  hovercolor,
  onMouseEnter,
  onMouseLeave,
  innerRef,
  onClick,
}: any) {
  const res = {
    children,
    className,
    hovercolor,
    onMouseEnter,
    onMouseLeave,
    onClick,
  };
  return innerRef ? Object.assign(res, { innerRef }) : res;
}

const TypographyWrapper = styled(
  React.forwardRef((props: any, ref) => (
    <span
      {...getOnlyTypographyProps(props)}
      // @ts-ignore
      ref={ref}
    />
  ))
)`
  display: block;
  ${(props) =>
    props.hovercolor && `:hover { color: ${getColor(props.hovercolor)};}`}
`;

export const TypographyTypes = {
  title: [fontSize(100), fontWeight(900), lineHeight(141), color("white")],
  subTitle: [fontSize(45), fontWeight(500), lineHeight(52), color("white")],
  spinnerWord: [
    fontSize("3rem"),
    fontWeight(600),
    lineHeight(63),
    color("white"),
  ],
  buttonCaption: [
    fontSize(30),
    fontWeight(600),
    lineHeight(34),
    color("black"),
  ],
};

export interface TypographyInterface {
  className?: string;
  as?:
    | React.FC<
        TypographyInterface & { className: string; children: React.ReactNode }
      >
    | string;
  type?: keyof typeof TypographyTypes;
  color?: Colors;
  tooltipMaxWidth?: number;
  styles?: any;
  children: ReactNode;
  useDotes?: boolean;
  hovercolor?: Colors;
  onClick?: () => void;
}

const Typography = ({
  as,
  className,
  styles,
  children,
  type,
  useDotes,
  hovercolor,
  color: colorProp,
  onClick,
}: TypographyInterface) => {
  return (
    <TypographyWrapper
      onClick={onClick}
      as={as as any}
      className={className}
      hovercolor={hovercolor}
      css={[
        onClick ? pointer : null,
        flex,
        ai(Aligns.CENTER),
        ...(type ? TypographyTypes[type] : []),
        ...(useDotes
          ? [
              display("block"),
              textOverflow("ellipsis"),
              overflow("hidden"),
              noWrapText,
            ]
          : []),
        colorProp ? color(colorProp) : null,
        styles,
      ]}
    >
      {children}
    </TypographyWrapper>
  );
};

Typography.defaultProps = {
  styles: [],
  useDotes: false,
  type: "regularBody",
};

export default React.memo(Typography);
