// @ts-ignore
import { Matrix, Transform } from "webgl-math";

export const wordsValidAngles = [
  17.5,
  53.5,
  89.5,
  125.5,
  161.5,
  197.5,
  233.5,
  269.5,
  305.5,
  341.5,
];

export const colorsValidAngles = [
  0,
  36,
  72,
  108,
  144,
  180,
  216,
  252,
  288,
  324,
];

export function getArcLength(angle: number, radius: number) {
  return (Math.PI * angle * radius) / 180;
}

export function getAnglesForCountElements(
  count: number,
  segmentAngle: number,
  startAngle = 0
) {
  const angles: number[] = [];

  for (let i = 0; i < count; i++) {
    angles.push(startAngle + segmentAngle * i);
  }

  return angles;
}

function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function getMatrix(
  angle: number,
  halfArcLength: number,
  radiusHalf: number
) {
  const identityMatrix = Matrix.idendity(4);

  const horizontalCenterMatrix = Transform.translate(
    identityMatrix,
    Float32Array.of(-halfArcLength, 0, 0)
  );

  const rotatedMatrix = Transform.rotate(
    horizontalCenterMatrix,
    radians(angle),
    Float32Array.of(0, 0, 1)
  );

  const translatedRotateCenterMatrix = Matrix.multiply(
    rotatedMatrix,
    Transform.translate(identityMatrix, Float32Array.of(0, -radiusHalf, 0))
  );

  return Matrix.multiply(
    Transform.translate(identityMatrix, Float32Array.of(0, -radiusHalf, 0)),
    translatedRotateCenterMatrix
  );
}

export function getRealAngle(angle: number) {
  const fullCircleCount = Math.floor(angle / 360);
  return angle - fullCircleCount * 360;
}

export function isStartAngleValueValid(
  realAngle: number,
  validAngles: number[]
) {
  return validAngles.find((validAngle) => validAngle === realAngle);
}

export function getClosestValue(angle: number, validAngles: number[]) {
  let result: number;

  for (let i = 0; i < validAngles.length; i++) {
    const validAngle = validAngles[i];

    if (angle > validAngles[validAngles.length - 1]) {
      result = validAngles[validAngles.length - 1];
      break;
    }
    if (validAngle < angle) continue;
    if (angle < validAngles[0]) {
      result = validAngles[0];
      break;
    }

    const prevValidAngle = validAngles[i - 1];
    const currentAngleDelta = validAngle - angle;
    const prevAngleDelta = (prevValidAngle - angle) * -1;

    if (currentAngleDelta < prevAngleDelta) {
      result = validAngle;
      break;
    }

    result = prevValidAngle;
    break;
  }

  return result!;
}

export function getRandomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
