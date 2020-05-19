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
