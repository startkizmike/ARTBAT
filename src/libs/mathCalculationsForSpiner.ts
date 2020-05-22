// @ts-ignore
import { Matrix, Transform } from "webgl-math";

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

export function radians(degrees: number) {
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

export function getRandomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function getAngleToRotate(startAngle: number, segmentCount: number) {
  const segmentAngle = 360 / segmentCount;
  const segmentNumber = Math.floor(getRandomInteger(0, 360) / segmentAngle);
  const fullRevolutions = 360 * 4;
  const newPickedSegmentAngle = segmentNumber * segmentAngle;

  return startAngle + newPickedSegmentAngle + fullRevolutions;
}
