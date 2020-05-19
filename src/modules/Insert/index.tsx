import React from "react";
import { assocPath } from "ramda";

import Wrapper from "primitives/Wrapper";
import {LinkButton} from "primitives/Button";

import MultiInputs, { MultiInputsVariant } from "./MultiInputs";
import InputColumnWrapper from "./InputColumnWrapper";

import {
  ai,
  Aligns,
  flex,
  flexBasis,
  flexColumn,
  fullWidth,
  jc,
  maxWidth,
  padding,
} from "libs/styles";

import State from "state";

interface OnChangeInputStateInterface {
  value: string;
  index: number;
  state: string[];
  setState: (val: string[]) => void;
}

export default React.memo(function ({}) {
  const [colors, setColors] = React.useState(State.colors);
  const [words, setWords] = React.useState(State.words);

  function setAdjectiveColors(adjectiveColors: string[]) {
    const result = { ...colors, adjectiveColors };
    State.setColors(result);
    setColors(result);
  }

  function setNounColors(nounColors: string[]) {
    const result = { ...colors, nounColors };
    State.setColors(result);
    setColors(result);
  }

  function setAdjectiveWords(adjectives: string[]) {
    const result = { ...words, adjectives };
    State.setWords(result);
    setWords(result);
  }

  function setNounWords(nouns: string[]) {
    const result = { ...words, nouns };
    State.setWords(result);
    setWords(result);
  }

  function onChangeInputState({
    value,
    index,
    state,
    setState,
  }: OnChangeInputStateInterface) {
    setState(assocPath([index], value, state));
  }

  return (
    <Wrapper
      styles={[
        flex,
        fullWidth,
        padding("20px 100px"),
        maxWidth(1300),
        jc(Aligns.SPACE_BETWEEN),
      ]}
    >
      <InputColumnWrapper basis="30%" title="Color">
        <MultiInputs
          state={colors.adjectiveColors}
          variant={MultiInputsVariant.COLORS}
          onChange={(value, index) =>
            onChangeInputState({
              value,
              index,
              state: colors.adjectiveColors,
              setState: setAdjectiveColors,
            })
          }
        />
        <MultiInputs
          state={colors.nounColors}
          variant={MultiInputsVariant.COLORS}
          onChange={(value, index) =>
            onChangeInputState({
              value,
              index,
              state: colors.nounColors,
              setState: setNounColors,
            })
          }
        />
      </InputColumnWrapper>
      <Wrapper
        styles={[
          flex,
          flexColumn,
          flexBasis("65%"),
          jc(Aligns.SPACE_BETWEEN),
          ai(Aligns.CENTER),
        ]}
      >
        <Wrapper styles={[flex, fullWidth, jc(Aligns.SPACE_BETWEEN)]}>
          <InputColumnWrapper basis="45%" title="Adjective">
            <MultiInputs
              state={words.adjectives}
              variant={MultiInputsVariant.WORDS}
              onChange={(value, index) =>
                onChangeInputState({
                  value,
                  index,
                  state: words.adjectives,
                  setState: setAdjectiveWords,
                })
              }
            />
          </InputColumnWrapper>
          <InputColumnWrapper basis="45%" title="Noun">
            <MultiInputs
              state={words.nouns}
              variant={MultiInputsVariant.WORDS}
              onChange={(value, index) =>
                onChangeInputState({
                  value,
                  index,
                  state: words.nouns,
                  setState: setNounWords,
                })
              }
            />
          </InputColumnWrapper>
        </Wrapper>
        <LinkButton title="submit" href="/spinner" />
      </Wrapper>
    </Wrapper>
  );
});
