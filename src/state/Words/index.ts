import { concat } from "ramda";

import { initValue } from "../initialValue";

export interface StateWordsInterface {
  adjectives: string[];
  nouns: string[];
}

export interface PickedWordsInterface {
  adjective: string;
  noun: string;
}

class WordsState {
  rotationAngle = 0;

  pickedWords: PickedWordsInterface= {
    adjective: "",
    noun: "",
  };

  words: StateWordsInterface = {
    adjectives: initValue,
    nouns: initValue,
  };

  get allWords() {
    return concat(this.words.adjectives, this.words.adjectives);
  }

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

  getRealWord(unknownWord: string) {
    const noun = this.words.nouns.find((word) => word === unknownWord);
    const adjective = this.words.adjectives.find(
      (word) => word === unknownWord
    );

    return noun || adjective || "";
  }

  clearState() {
    this.rotationAngle = 0;
    this.pickedWords = {
      adjective: "",
      noun: "",
    };
    this.words = {
      adjectives: initValue,
      nouns: initValue,
    };
  }
}

export default new WordsState();
