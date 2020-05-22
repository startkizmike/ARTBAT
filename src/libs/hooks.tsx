import React from "react";

export function useBoolean(
  initial: boolean | (() => boolean)
): [boolean, () => void, () => void] {
  const [state, setState] = React.useState(initial);
  return [state, () => setState(true), () => setState(false)];
}
