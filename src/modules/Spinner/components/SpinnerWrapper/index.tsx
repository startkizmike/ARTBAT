import React, { ReactNode } from "react";
import { debounce } from "lodash";

import Wrapper from "primitives/Wrapper";

import {
  ai,
  Aligns,
  flex,
  flexColumn,
  flexGrow,
  jc,
  position,
} from "libs/styles";

interface SpinnerWrapperInterface {
  wrapperFlexGrowValue?: number;
  children: (size: number) => ReactNode;
}

export default React.memo(function ({
  wrapperFlexGrowValue = 0.4,
  children,
}: SpinnerWrapperInterface) {
  const [size, setSize] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>();

  function getSize() {
    if (!ref.current) {
      return 0;
    }
    const rect = ref.current.getBoundingClientRect();

    return Math.min(rect.width, rect.height - 95);
  }

  React.useEffect(() => {
    if (size === 0) {
      setSize(getSize());
    }

    const handler = debounce(() => {
      setSize(getSize());
    }, 10);

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <Wrapper
      ref={ref}
      styles={[
        flex,
        flexGrow(wrapperFlexGrowValue),
        flexColumn,
        ai(Aligns.CENTER),
        jc(Aligns.END),
        position("relative"),
      ]}
    >
      {children(size)}
    </Wrapper>
  );
});
