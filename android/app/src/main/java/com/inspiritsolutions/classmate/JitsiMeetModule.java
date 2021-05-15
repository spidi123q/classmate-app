package com.inspiritsolutions.classmate;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions;

public class JitsiMeetModule extends ReactContextBaseJavaModule {
    JitsiMeetModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "JitsiMeetModule";
    }

    @ReactMethod
    public void join(String name) {
        Log.d("JitsiMeetModule", "Create event called with name: " + name);
        JitsiMeetConferenceOptions options
                = new JitsiMeetConferenceOptions.Builder()
                .setRoom("https://meet.jit.si/test1233231231231")
                // Settings for audio and video
                //.setAudioMuted(true)
                //.setVideoMuted(true)
                .setWelcomePageEnabled(false)
                .build();
        // Launch the new activity with the given options. The launch() method takes care
        // of creating the required Intent and passing the options.
        JitsiMeetActivity.launch(this.getCurrentActivity(), options);
    }
}
