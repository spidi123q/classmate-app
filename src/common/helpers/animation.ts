const DefaultDuration: number = 500;

export const slideUpProps: any = {
  animation: "slideInUp",
  iterationCount: 1,
  direction: "alternate",
  duration: DefaultDuration,
};

export const slideDownProps = (duration: number = DefaultDuration): any => ({
  animation: "slideInDown",
  iterationCount: 1,
  direction: "alternate",
  duration: duration,
});

export const bounceInProps = (duration: number = DefaultDuration): any => ({
  animation: "bounceIn",
  iterationCount: 1,
  duration: duration,
});

export const zoomInProps = (duration: number = DefaultDuration): any => ({
  animation: "zoomIn",
  iterationCount: 1,
  duration: duration,
});

export const bounce = (ref: React.MutableRefObject<any>) =>
  ref.current.bounce(DefaultDuration);

export const fadeOut = (ref: React.MutableRefObject<any>) =>
  ref.current.fadeOut(DefaultDuration);

export const fadeIn = (ref: React.MutableRefObject<any>) =>
  ref.current.fadeIn(DefaultDuration);

export const pulse = (ref: React.MutableRefObject<any>) =>
  ref.current.pulse(DefaultDuration);

export type IAnimation =
  | "fadeOut"
  | "fadeIn"
  | "pulse"
  | "bounce"
  | "slideInLeft"
  | "slideInRight"
  | "slideOutLeft"
  | "slideInUp"
  | "slideInDown"
  | "flipOutX";

interface IAnimationResposne {
  finished: boolean;
}
export const animate = (
  name: IAnimation,
  ref: React.MutableRefObject<any>,
  duration?: number,
  onEnd?: Function
): Promise<IAnimationResposne> =>
  ref.current && ref.current[name](duration ?? DefaultDuration).then(onEnd);
