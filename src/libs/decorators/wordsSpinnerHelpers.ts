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

export function getWordOpacityByRealAngle(realAngle: number): string {
  if (
    (realAngle >= 0 && realAngle <= 45) ||
    (realAngle >= 135 && realAngle <= 225) ||
    realAngle >= 315
  ) {
    return "0";
  }

  if (
    (realAngle > 45 && realAngle <= 60) ||
    (realAngle >= 120 && realAngle < 135) ||
    (realAngle > 225 && realAngle <= 240) ||
    (realAngle >= 300 && realAngle < 315)
  ) {
    return "0.35";
  }

  return "1";
}
