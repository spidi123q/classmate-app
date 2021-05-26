import React from "react";

interface IJitsiMeetUserInfo {
  displayName?: string;
  email?: string;
  avatar?: string;
}

interface IRNJitsiMeet {
  join: (url: string, userInfo: IJitsiMeetUserInfo | null) => void;
  showJoinMeetingNotification();
}

/**
 * Platform: iOS
 */
declare const JitsiMeetView: React.FunctionComponent<any>;
/**
 * Platform: Android, iOS
 */
declare const RNJitsiMeet: IRNJitsiMeet;
