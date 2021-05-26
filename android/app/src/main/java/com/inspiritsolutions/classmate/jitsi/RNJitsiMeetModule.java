package com.inspiritsolutions.classmate.jitsi;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;
import android.widget.RemoteViews;

import androidx.core.app.NotificationCompat;

import java.net.URL;
import java.net.MalformedURLException;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.ReadableMap;
import com.inspiritsolutions.classmate.MainActivity;
import com.inspiritsolutions.classmate.R;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions;
import org.jitsi.meet.sdk.JitsiMeetUserInfo;

@ReactModule(name = RNJitsiMeetModule.MODULE_NAME)
public class RNJitsiMeetModule extends ReactContextBaseJavaModule {
    public static final String MODULE_NAME = "RNJitsiMeetModule";
    private String CHANNEL_ID = "12312312";
    private Context context;

    public RNJitsiMeetModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext.getApplicationContext();

    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void initialize() {
        Log.d(MODULE_NAME, "Initialize is deprecated in v2");
    }

    @ReactMethod
    public void join(String url, ReadableMap userInfo) {
        Activity currentActivity = this.getCurrentActivity();
        JitsiHelper.join(url, userInfo, context);
    }
}
