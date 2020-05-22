import React from "react";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import eventValue from "libs/decorators/eventValue";
import { colorParserHelper } from "libs/colorParserHelper";

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
    parseValue: (value: string) => string;
  }
> = {
  [MultiInputsVariant.WORDS]: {
    maxLength: () => 15,
    parseValue: (value) => value,
  },
  [MultiInputsVariant.COLORS]: {
    maxLength: (value) => {
      if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value!)) {
        return 7;
      }

      return 18;
    },
    parseValue: (value) => {
      if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value!)) {
        return colorParserHelper(value).hex!;
      }

      return value;
    },
  },
};

export default React.memo(function ({
  state,
  variant,
  onChange,
}: MultiInputsInterface) {
  const { maxLength, parseValue } = inputVariantsConfig[variant];

  return (
    <Wrapper>
      {state.map((value, index) => (
        <StyledInput
          key={index}
          type="text"
          value={value}
          maxLength={maxLength(value)}
          onChange={eventValue((value: string) =>
            onChange(parseValue(value), index)
          )}
        />
      ))}
    </Wrapper>
  );
});

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  background: none;
  border: 1.5px solid #ffffff;
  color: white;
  padding: 5px 10px;
  margin-bottom: 15px;
  border-radius: 3px;
  font-size: 1.5rem;

  @media screen and (max-height: 1024px) {
    height: 40px;
  }
`;
