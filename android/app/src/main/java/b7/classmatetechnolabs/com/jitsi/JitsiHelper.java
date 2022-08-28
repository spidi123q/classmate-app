package b7.classmatetechnolabs.com.jitsi;

import android.content.Context;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions;
import org.jitsi.meet.sdk.JitsiMeetUserInfo;

import java.net.MalformedURLException;
import java.net.URL;

public class JitsiHelper {

    public static void join(String url, JitsiMeetUserInfo userInfo, Context context) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                JitsiMeetConferenceOptions options
                        = new JitsiMeetConferenceOptions.Builder()
                        .setRoom(url)
                        .setUserInfo(userInfo)
                        // Settings for audio and video
                        //.setAudioMuted(true)
                        //.setVideoMuted(true)
                        .setFeatureFlag("recording.enabled", false)
                        .setFeatureFlag("live-streaming.enabled", false)
                        .setFeatureFlag("invite.enabled", false)
                        .build();
                // Launch the new activity with the given options. The launch() method takes care
                // of creating the required Intent and passing the options.
                JitsiMeetActivity.launch(context, options);
            }
        });
    }

    public static void join(String url, ReadableMap userInfo, Context context) {
        JitsiMeetUserInfo _userInfo = new JitsiMeetUserInfo();
        if (userInfo != null) {
            if (userInfo.hasKey("displayName")) {
                _userInfo.setDisplayName(userInfo.getString("displayName"));
            }
            if (userInfo.hasKey("email")) {
                _userInfo.setEmail(userInfo.getString("email"));
            }
            if (userInfo.hasKey("avatar")) {

                String avatarURL = userInfo.getString("avatar");
                try {
                    _userInfo.setAvatar(new URL(avatarURL));
                } catch (MalformedURLException e) {
                }
            }
        }
        join(url, _userInfo, context);
    }
}
