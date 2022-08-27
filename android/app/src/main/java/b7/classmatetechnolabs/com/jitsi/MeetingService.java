package b7.classmatetechnolabs.com.jitsi;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.widget.RemoteViews;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import b7.classmatetechnolabs.com.MainActivity;
import b7.classmatetechnolabs.com.R;
import b7.classmatetechnolabs.com.jitsi.MeetingNotificationReceiver;
import b7.classmatetechnolabs.com.jitsi.NotificationHelper;

import org.jitsi.meet.sdk.JitsiMeetActivity;

public class MeetingService extends FirebaseMessagingService {

    private String TAG = this.getClass().getSimpleName();
    private String CHANNEL_ID = "12312312";
    private NotificationHelper notificationHelper;


    @Override
    public void onCreate() {
        Log.d(TAG, "Initialized service");
        notificationHelper = new NotificationHelper(this);
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // ...
        // TODO(developer): Handle FCM messages here.
        // Not getting messages here? See why this may be: https://goo.gl/39bRNJ
        Log.d(TAG, "From: " + remoteMessage.getFrom());

        // Check if message contains a data payload.
        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "Message data payload: " + remoteMessage.getData());
            // startForeground(NotificationHelper.MEETING_JOIN__ID, notificationHelper.getJoinMeetingNotification());
            // notificationHelper.cancelJoinNotificationOnTimeout();
        }

        // Check if message contains a notification payload.
        if (remoteMessage.getNotification() != null) {
            Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
        }

        // Also if you intend on generating your own notifications as a result of a received FCM
        // message, here is where that should be initiated. See sendNotification method below.
    }
}
