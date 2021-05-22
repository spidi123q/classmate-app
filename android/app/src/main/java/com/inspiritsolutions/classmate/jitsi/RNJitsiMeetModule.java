package com.inspiritsolutions.classmate.jitsi;

import android.app.Activity;
import android.util.Log;
import java.net.URL;
import java.net.MalformedURLException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableMap;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions;
import org.jitsi.meet.sdk.JitsiMeetUserInfo;

@ReactModule(name = RNJitsiMeetModule.MODULE_NAME)
public class RNJitsiMeetModule extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "RNJitsiMeetModule";

    public RNJitsiMeetModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void initialize() {
        Log.d("JitsiMeet", "Initialize is deprecated in v2");
    }

    @ReactMethod
    public void join(String url, ReadableMap userInfo) {
        Activity currentActivity = this.getCurrentActivity();
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
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
                JitsiMeetConferenceOptions options
                        = new JitsiMeetConferenceOptions.Builder()
                        .setRoom("https://meet.jit.si/test1233231231231")
                        .setUserInfo(_userInfo)
                        // Settings for audio and video
                        //.setAudioMuted(true)
                        //.setVideoMuted(true)
                        .setWelcomePageEnabled(false)
                        .build();
                // Launch the new activity with the given options. The launch() method takes care
                // of creating the required Intent and passing the options.
                JitsiMeetActivity.launch(currentActivity, options);
            }
        });
    }
}
