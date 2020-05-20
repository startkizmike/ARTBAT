import { action, observable, computed } from "mobx";
import { concat } from "ramda";

import {initValue} from "../initialValue";

import { Spinner } from "libs/animationForSpinner";

export interface StateWordsInterface {
  adjectives: string[];
  nouns: string[];
}

class WordsState {
  spinner = new Spinner();

  @observable pickedWords = {
    adjective: "",
    noun: "",
  };

  @observable words: StateWordsInterface = {
    adjectives: initValue,
    nouns: initValue,
  };

  @computed
  get allWords() {
    return concat(this.words.adjectives, this.words.adjectives);
  }

  @action
  setWords(words: StateWordsInterface) {
    this.words = words;
  }

  getMixedList() {
    const mixedList = [];
    const { adjectives, nouns } = this.words;

    for (let i = 0; i < this.allWords.length / 2; i++) {
      mixedList.push(adjectives[i], nouns[i]);
    }

    return mixedList;
  }
}

export default new WordsState();
