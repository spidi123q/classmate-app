package b7.classmatetechnolabs.com.jitsi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReadableMap;

import org.jitsi.meet.sdk.JitsiMeetActivity;
import org.jitsi.meet.sdk.JitsiMeetConferenceOptions;

public class MeetingNotificationReceiver extends BroadcastReceiver {
    private String TAG = this.getClass().getSimpleName();
    private Context context;
    private NotificationHelper notificationHelper;

    @Override
    public void onReceive(Context context, Intent intent) {
        this.context = context;
        notificationHelper = new NotificationHelper(context);
        processUserAction(intent);
    };

    private void processUserAction(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            String actionType = extras.getString(NotificationHelper.ACTION_TYPE);
            // and get whatever type user account id is
            Log.d(TAG, "Intent actionType: " + actionType);
            if(actionType.equals(NotificationHelper.ACTION_JOIN)) {
                Log.d(TAG, "answer" );
                JitsiHelper.join("https://meet.jit.si/test1233231231231", (ReadableMap) null, context);
            }
        }
        else {
            Log.d(TAG, "extras null : " );
        }
        notificationHelper.removeJoinNotification();
    }


}
