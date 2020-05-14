import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { inputValueColorParser } from "libs/inputValueColorParser";

interface MultiInputsInterface {
  state: string[];
  variant: MultiInputsVariant;
  onChange: (value: string, index: number) => void;
}

export enum MultiInputsVariant {
  COLORS = "COLORS",
  WORDS = "WORDS",
}

const inputVariantsConfig: Record<
  MultiInputsVariant,
  {
    maxLength: (value?: string) => number;
    parsValue: (value: string) => string;
  }
> = {
  [MultiInputsVariant.COLORS]: {
    maxLength: (value) => {
      if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value!)) {
        return 7;
      }

      return 18;
    },
    parsValue: (value) => {
      if (value.includes(" ") || value.includes(",")) {
        return value;
      }
      return inputValueColorParser(value).hex!;
    },
  },
  [MultiInputsVariant.WORDS]: {
    maxLength: () => 25,
    parsValue: (value) => value,
  },
};

export default React.memo(function ({
  state,
  variant,
  onChange,
}: MultiInputsInterface) {
  const { maxLength, parsValue } = inputVariantsConfig[variant];

  return (
    <Wrapper>
      {state.map((value, index) => (
        <StyledInput
          key={index}
          type="text"
          value={value}
          maxLength={maxLength(value)}
          onChange={eventValue((value: string) =>
            onChange(parsValue(value), index)
          )}
        />
      ))}
    </Wrapper>
  );
});

const StyledInput = styled.input`
  width: 100%;
  min-height: 30px;
  height: 50px;
  background: none;
  border: 1.5px solid #ffffff;
  color: white;
  padding: 5px 10px;
  margin-bottom: 15px;
  border-radius: 3px;
`;
