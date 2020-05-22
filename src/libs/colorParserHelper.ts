export type RGB = { r: number; g: number; b: number };
type ColorParserOutPut = { hex: string | null; rgb: RGB | null };

export function rgbToHex({ r, g, b }: RGB): string | null {
  const result =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return result ? result : "";
}

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: -1,
        g: -1,
        b: -1,
      };
}

export function colorParserHelper(value: string): ColorParserOutPut {
  const result: ColorParserOutPut = {
    hex: null,
    rgb: {
      r: -1,
      g: -1,
      b: -1,
    },
  };

  if (
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value) ||
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(value)
  ) {
    result.hex = value.startsWith("#") ? value : `#${value}`;
    result.rgb = hexToRgb(value);
    return result;
  }

  if ((value.includes(" ") || value.includes(",")) && /\d+/.exec(value)) {
    const numbers = value.match(/\d+/g)!.map((str) => parseInt(str));
    if (numbers.length !== 3) return result;
    const rgb = { r: numbers![0], g: numbers![1], b: numbers![2] };

    result.rgb = rgb;
    result.hex = rgbToHex(rgb);
  }

  return result;
}

export function getValidColorValue(colorValue: number | string): string {
  const stringColorValue = colorValue.toString();
  if (stringColorValue.length === 3) return stringColorValue;

  return getValidColorValue("0" + stringColorValue);
}

export function parseNumberRgbToString({ r, g, b }: RGB) {
  return {
    r: getValidColorValue(r),
    g: getValidColorValue(g),
    b: getValidColorValue(b),
  };
}
