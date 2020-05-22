import React from "react";
import { assocPath, find } from "ramda";
import styled from "styled-components";

import Wrapper from "primitives/Wrapper";

import MultiInputs, { MultiInputsVariant } from "./MultiInputs";
import InputColumnWrapper from "./InputColumnWrapper";
import InsertFooter from "./InsertFooter";

import {
  ai,
  Aligns,
  flex,
  flexBasis,
  flexColumn,
  fullWidth,
  height,
  jc,
  maxWidth,
  padding,
} from "libs/styles";

import WordsState, { StateWordsInterface } from "state/Words";
import ColorsState, { StateColorsInterface } from "state/Colors";

interface OnChangeInputStateInterface {
  value: string;
  index: number;
  state: string[];
  setState: (val: string[]) => void;
}

function findEmptyValue(values: string[]) {
  const emptyElement = find((a) => a === "", values);
  return emptyElement !== undefined;
}

function isSubmitButtonDisabled(
  colors: StateColorsInterface,
  words: StateWordsInterface
) {
  return (
    findEmptyValue(colors.adjectiveColors) ||
    findEmptyValue(colors.nounColors) ||
    findEmptyValue(words.adjectives) ||
    findEmptyValue(words.nouns)
  );
}

export default React.memo(function ({}) {
  const [colors, setColors] = React.useState(() => ColorsState.colors);
  const [words, setWords] = React.useState(() => WordsState.words);

  function setAdjectiveColors(adjectiveColors: string[]) {
    const result = { ...colors, adjectiveColors };
    ColorsState.setColors(result);
    setColors(result);
  }

  function setNounColors(nounColors: string[]) {
    const result = { ...colors, nounColors };
    ColorsState.setColors(result);
    setColors(result);
  }

  function setAdjectiveWords(adjectives: string[]) {
    const result = { ...words, adjectives };
    WordsState.setWords(result);
    setWords(result);
  }

  function setNounWords(nouns: string[]) {
    const result = { ...words, nouns };
    WordsState.setWords(result);
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
        height("100%"),
        flexColumn,
        padding("0 80px 85px"),
        maxWidth(1400),
        jc(Aligns.END),
      ]}
    >
      <InsertContentWrapper>
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
            flexBasis("65%"),
            jc(Aligns.SPACE_AROUND),
            ai(Aligns.START),
          ]}
        >
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
      </InsertContentWrapper>
      <InsertFooter
        submitButtonDisabled={isSubmitButtonDisabled(colors, words)}
      />
    </Wrapper>
  );
});

const InsertContentWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70%;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 0;
  }
`;
