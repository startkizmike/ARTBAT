import { concat } from "ramda";

import { initValue } from "../initialValue";
import {colorParserHelper, RGB} from "libs/colorParserHelper";

export interface StateColorsInterface {
  adjectiveColors: string[];
  nounColors: string[];
}

class ColorsState {
  rotationAngle = 0;

  pickedColor: RGB = {
    r: 0,
    g: 0,
    b: 0,
  };

  colors: StateColorsInterface = {
    adjectiveColors: initValue,
    nounColors: initValue,
  };

  get allColors() {
    return concat(this.colors.adjectiveColors, this.colors.nounColors);
  }

  setColors(colors: StateColorsInterface) {
    this.colors = this.prepareColorsToState(colors);
  }

  private prepareColorsToState(colors: StateColorsInterface) {
    return {
      adjectiveColors: colors.adjectiveColors.map(
        (color) => colorParserHelper(color).hex!
      ),
      nounColors: colors.nounColors.map(
        (color) => colorParserHelper(color).hex!
      ),
    };
  }

  clearState() {
    this.rotationAngle = 0;
    this.pickedColor = {
      r: 0,
      g: 0,
      b: 0,
    };
    this.colors = {
      adjectiveColors: initValue,
      nounColors: initValue,
    };
  }
}

export default new ColorsState();
