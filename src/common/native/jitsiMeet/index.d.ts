import React from "react";

export interface IParams {
  userInfo: IJitsiMeetUserInfo;
  url: string;
}

interface IJitsiMeetUserInfo {
  displayName?: string;
  email?: string;
  avatar?: string;
}

interface IRNJitsiMeet {
  join: (url: string, userInfo: IJitsiMeetUserInfo | null) => void;
}

/**
 * Platform: iOS
 */
declare const JitsiMeetView: React.FunctionComponent<any>;
/**
 * Platform: Android, iOS
 */
declare const RNJitsiMeet: IRNJitsiMeet;
