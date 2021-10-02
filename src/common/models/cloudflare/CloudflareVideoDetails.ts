export interface ICloudflareVideoDetails {
  allowedOrigins: string[];
  created: string;
  duration: number;
  input: IInput;
  maxDurationSeconds: number;
  meta: IMeta;
  modified: string;
  uploadExpiry: string;
  playback: IPlayback;
  preview: string;
  readyToStream: boolean;
  requireSignedURLs: boolean;
  size: number;
  status: IStatus;
  thumbnail: string;
  thumbnailTimestampPct: number;
  uid: string;
  uploaded: string;
  watermark: IWatermark;
  nft: INft;
  token?: string;
}

export interface IInput {
  height: number;
  width: number;
}

export interface IMeta {}

export interface INft {
  contract: string;
  token: number;
}

export interface IPlayback {
  hls: string;
  dash: string;
}

export interface IStatus {
  state: "ready" | "inprogress" | "pendingupload" | "queued";
  pctComplete: number;
  errorReasonCode: string;
  errorReasonText: string;
}

export interface IWatermark {
  uid: string;
  size: number;
  height: number;
  width: number;
  created: string;
  downloadedFrom: string;
  name: string;
  opacity: number;
  padding: number;
  scale: number;
  position: string;
}
