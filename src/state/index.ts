import { action, observable } from "mobx";

export const universalInitValue = ["", "", "", "", ""];

export interface StateColorsInterface {
  adjectiveColors: string[];
  nounColors: string[];
}

export interface StateWordsInterface {
  adjectives: string[];
  nouns: string[];
}

class State {
  @observable colors: StateColorsInterface = {
    adjectiveColors: universalInitValue,
    nounColors: universalInitValue,
  };
  @observable words: StateWordsInterface = {
    adjectives: universalInitValue,
    nouns: universalInitValue,
  };

  @action
  setColors(colors: StateColorsInterface) {
    this.colors = colors;
  }

  @action
  setWords(words: StateWordsInterface) {
    this.words = words;
  }
}

export default new State();
