import { action, observable, computed } from "mobx";
import { concat } from "ramda";

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
  @observable pickedData: any = {
    color: { r: "060", g: "000", b: "165" },
    adjective: "Sheltering",
    noun: "Paws",
  };

  @observable colors: StateColorsInterface = {
    adjectiveColors: universalInitValue,
    nounColors: universalInitValue,
  };

  @observable words: StateWordsInterface = {
    adjectives: universalInitValue,
    nouns: universalInitValue,
  };

  @computed
  get allColors() {
    return concat(this.colors.adjectiveColors, this.colors.nounColors);
  }

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
