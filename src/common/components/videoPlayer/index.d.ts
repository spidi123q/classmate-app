import { StyleProp, ViewStyle } from "react-native";
import { VideoProperties } from "react-native-video";

export interface IOnLoadData {
  audioTracks: ITrack[];
  canPlayFastForward: boolean;
  canPlayReverse: boolean;
  canPlaySlowForward: boolean;
  canPlaySlowReverse: boolean;
  canStepBackward: boolean;
  canStepForward: boolean;
  currentTime: number;
  duration: number;
  naturalSize: INaturalSize;
  textTracks: ITrack[];
  trackId: string;
  videoTracks?: IVideoTrack[];
}
export interface ITrack {
  bitrate?: string;
  index: number;
  language: string;
  title: string;
  type: string;
}

export interface INaturalSize {
  height: number;
  orientation: string;
  width: number;
}

export interface IVideoTrack {
  bitrate: number;
  codecs: string;
  height: number;
  trackId: string;
  width: number;
}

export interface IBitRate {
  bitrate: number;
  name: string;
}

export interface IOpts {
  playWhenInactive?: boolean;
  playInBackground?: boolean;
  repeat?: boolean;
  title?: string;
}

export interface IEvents
  extends Pick<VideoProperties, "onLoad" | "onProgress"> {
  onError: (err: any) => void;
  onBack: () => void;
  onEnd: () => void;
  onEnterFullscreen?: () => void;
  onExitFullscreen?: () => void;
  onShowControls?: () => void;
  onHideControls?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onLoadStart: (args?: any) => void;
  onScreenTouch: () => void;
  onSeek: (data?: any) => void;
  onSettings: () => void;
}

export interface IMethods {
  toggleFullscreen: () => void;
  togglePlayPause: () => void;
  toggleControls: () => void;
  toggleTimer: () => void;
}

export interface IPlayer {
  controlTimeoutDelay: number;
  volumePanResponder: any;
  seekPanResponder: any;
  controlTimeout: number | null;
  tapActionTimeout: number | null;
  volumeWidth: number;
  iconOffset: number;
  seekerWidth: number;
  ref: any;
  scrubbingTimeStep: boolean | number;
  tapAnywhereToPause?: boolean;
}

export interface IStyles {
  videoStyle: any;
  containerStyle: any;
}
export interface IProps extends VideoProperties {
  toggleResizeModeOnFullscreen?: boolean;
  controlAnimationTiming?: 500;
  doubleTapTime?: 130;
  isFullscreen?: boolean;
  showOnStart?: boolean;
  title?: string;
  videoStyle?: StyleProp<ViewStyle>;
  navigator?: any;
  showTimeRemaining?: boolean;
  showHours?: boolean;
  controlTimeout?: number;
  tapAnywhereToPause?: boolean;
  scrubbing?: boolean;
  seekColor?: string;
  disablePlayPause?: boolean;
  disableSeekbar?: boolean;
  disableTimer?: boolean;
  disableFullscreen?: boolean;
  disableVolume?: boolean;
  disableBack?: boolean;
  cloudflareStreamVideoId?: string;
  onEnterFullscreen?: () => void;
  onExitFullscreen?: () => void;
  onShowControls?: () => void;
  onHideControls?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onBack?: () => void;
}

export interface IState extends Omit<IProps, "source"> {
  isFullscreen?: boolean;
  volumeTrackWidth: number;
  volumeFillWidth: number;
  seekerFillWidth: number;
  showControls?: boolean;
  volumePosition: number;
  seekerPosition: number;
  volumeOffset: number;
  seekerOffset: number;
  seeking: boolean;
  originallyPaused: boolean;
  loading: boolean;
  isBuffering: boolean;
  currentTime: number;
  error: boolean;
  duration: number;
  showRemainingTime?: boolean;
  volume: number;
  currentBitrate: number;
  videoTracks?: IVideoTrack[];
  currentVideoTrack?: IVideoTrack;
}

export const availableBitrates: IBitRate[] = [
  {
    name: "180p",
    bitrate: 357804,
  },
  {
    name: "360p",
    bitrate: 585674,
  },
  {
    name: "540p",
    bitrate: 863983,
  },
];

declare const VideoPlayer: React.ComponentType<IProps>;
export default VideoPlayer;
