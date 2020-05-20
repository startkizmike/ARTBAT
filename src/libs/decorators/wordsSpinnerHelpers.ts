export function getRealAngleAndArithmeticSign(
  angle: number
): { realAngle: number; arithmeticSign: string; revertArithmeticSign: string } {
  if (angle <= 180) {
    return { realAngle: angle, arithmeticSign: "-", revertArithmeticSign: "+" };
  }
  if (angle >= 180 && angle <= 360) {
    return { realAngle: angle, arithmeticSign: "+", revertArithmeticSign: "-" };
  }

  const floorCircleCount = Math.floor(angle / 360);
  const realAngle = angle - 360 * floorCircleCount;
  return getRealAngleAndArithmeticSign(realAngle);
}

export function getWordMaskBackgroundByRealAngle(realAngle: number): string {
  if (
    (realAngle >= 0 && realAngle <= 45) ||
    (realAngle >= 135 && realAngle <= 225) ||
    realAngle >= 315
  ) {
    return "black";
  }

  if (
    (realAngle >= 120 && realAngle < 135) ||
    (realAngle > 225 && realAngle <= 240)
  ) {
    return "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);";
  }
  if (
    (realAngle > 45 && realAngle <= 60) ||
    (realAngle >= 300 && realAngle < 315)
  ) {
    return "linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, #000000 100%);";
  }

  return "none";
}
