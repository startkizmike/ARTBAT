type RGB = { r: number; g: number; b: number };
type ColorParserOutPut = { hex: string | null; rgb: RGB | null };

function rgbToHex({ r, g, b }: RGB): string | null {
  const result =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return result ? result : null;
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function inputValueColorParser(value: string): ColorParserOutPut {
  const result: ColorParserOutPut = { hex: null, rgb: null };

  if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)) {
    result.hex = value.startsWith("#") ? value : `#${value}`;
    result.rgb = hexToRgb(value);
    return result;
  }

  if (value.includes(" ") || value.includes(",")) {
    const numbers = value.match(/\d+/g)!.map((str) => parseInt(str));
    const rgb = { r: numbers![0], g: numbers![1], b: numbers![2] };

    result.rgb = rgb;
    result.hex = rgbToHex(rgb);
  }

  return result;
}
