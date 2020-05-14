import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components/macro";

const StyledWrapper = styled.div``;

interface WrapperInterface {
  className?: string;
  styles?: any;
  as?: any;
  children?: ReactNode;
  [name: string]: any;
}

export default React.memo(
  forwardRef(function (props: WrapperInterface, ref) {
    const { styles, as, className, children, ...otherProps } = props;
    return (
      <StyledWrapper ref={ref} className={className} css={styles} as={as} {...otherProps}>
        {children}
      </StyledWrapper>
    );
  }),
);
