import {
  getClosestValue,
  getRealAngle,
  isStartAngleValueValid,
} from "./mathCalculationsForSpiner";

interface OnSpinConfigsInterface {
  animateTime: number;
  speedFactor: number;
  validAngles: number[];
  msInOneUnit?: number;
  startAngle?: number;
}

export class Spinner {
  requestAnimation: number | null = null;
  previewTime: number | null = null;
  animateTime: number = 0;
  startAngle: number = 0;
  speedFactor: number = 1;

  onSpin(
    {
      animateTime,
      speedFactor,
      validAngles,
      msInOneUnit = 1 / 60,
      startAngle = 0,
    }: OnSpinConfigsInterface,
    onChange: (newStartAngle: number) => void
  ) {
    this.animateTime = animateTime;
    this.speedFactor = speedFactor;
    this.startAngle = startAngle;

    const innerAnimateFunc = (time: number) => {
      if (!this.previewTime) {
        this.previewTime = time;
      }
      const delta = time - this.previewTime!;
      const microSeconds = 0.001 * delta;
      const speed = Math.floor(microSeconds / msInOneUnit);

      if (this.animateTime <= 0) {
        return this.animateAfterSpin(validAngles, onChange, innerAnimateFunc);
      }

      const step = 36 * this.speedFactor;
      this.startAngle += Math.round(
        microSeconds * (this.startAngle + step * speed - this.startAngle + step)
      );
      this.previewTime = time;
      this.animateTime -= 0.02;
      this.speedFactor -= this.speedFactor > 1 ? 0.02 : 0;

      onChange(this.startAngle);
      this.requestAnimation = requestAnimationFrame(innerAnimateFunc);
    };

    this.requestAnimation = requestAnimationFrame(innerAnimateFunc);
  }

  private animateAfterSpin(
    validAngles: number[],
    onChange: (newStartAngle: number) => void,
    animate: (time: number) => void
  ) {
    if (isStartAngleValueValid(getRealAngle(this.startAngle), validAngles)) {
      return this.cancelAnimation();
    }
    const closestValue = getClosestValue(this.startAngle, validAngles);

    this.startAngle += closestValue > this.startAngle ? 0.25 : -0.25;
    onChange(this.startAngle);
    this.requestAnimation = requestAnimationFrame(animate);
  }

  private cancelAnimation() {
    if (this.requestAnimation) {
      cancelAnimationFrame(this.requestAnimation);
    }
  }
}
