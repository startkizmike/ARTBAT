import React from "react";
import { debounce } from "lodash";

import Wrapper from "primitives/Wrapper";

import WordsCircle from "./WordsCircle";

import {
  ai,
  Aligns,
  flex,
  flexColumn,
  height,
  jc,
  position,
  width,
} from "libs/styles";

export default React.memo(function ColorsSpinner() {
  const [size, setSize] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>();

  function getSize() {
    if (!ref.current) {
      return 0;
    }
    const rect = ref.current.getBoundingClientRect();

    return Math.min(rect.width, rect.height);
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
        width("41%"),
        height("90%"),
        flexColumn,
        ai(Aligns.CENTER),
        jc(Aligns.CENTER),
        position("relative"),
      ]}
    >
      <WordsCircle size={size} />
    </Wrapper>
  );
});
