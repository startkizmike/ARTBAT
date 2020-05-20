import { action, observable, computed } from "mobx";
import { concat } from "ramda";

import { initValue } from "../initialValue";

import { Spinner } from "libs/animationForSpinner";

export interface StateColorsInterface {
  adjectiveColors: string[];
  nounColors: string[];
}

class ColorsState {
  spinner = new Spinner();

  @observable pickedColor = {
    r: -1,
    g: -1,
    b: -1,
  };

  @observable colors: StateColorsInterface = {
    adjectiveColors: initValue,
    nounColors: initValue,
  };

  @computed
  get allColors() {
    return concat(this.colors.adjectiveColors, this.colors.nounColors);
  }

  @action
  setColors(colors: StateColorsInterface) {
    this.colors = colors;
  }
}

export default new ColorsState();
