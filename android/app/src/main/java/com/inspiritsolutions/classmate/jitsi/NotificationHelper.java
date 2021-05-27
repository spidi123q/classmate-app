package com.inspiritsolutions.classmate.jitsi;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Looper;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.inspiritsolutions.classmate.MainActivity;
import com.inspiritsolutions.classmate.R;

public class NotificationHelper {

    private final Context context;
    private String TAG = this.getClass().getSimpleName();
    private NotificationManager notificationManager;
    public static  String MEETING_JOIN_CHANNEL_ID = "JitsiMeeting";
    public static int MEETING_JOIN__ID = 123456;
    public static  final String ACTION_TYPE = "ACTION_TYPE";
    public static  final String ACTION_JOIN = "ACTION_JOIN";
    public static  final String ACTION_DECLINE = "ACTION_DECLINE";
    public static  final int RING_TIMEOUT = 45000;


    NotificationHelper(Context context) {
        this.context = context;
    }

    public Notification getJoinMeetingNotification() {
        Log.d(TAG, "Notification build started");
        // RemoteViews customView = new RemoteViews(getPackageName(), R.layout.join_meeting_notification);
        Intent notificationIntent = new Intent(context, MainActivity.class);
        Intent hungupIntent = new Intent(context, MeetingNotificationReceiver.class);
        Intent answerIntent = new Intent(context, MeetingNotificationReceiver.class);
        hungupIntent.putExtra(ACTION_TYPE, ACTION_DECLINE);
        answerIntent.putExtra(ACTION_TYPE, ACTION_JOIN);

        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        PendingIntent hungupPendingIntent = PendingIntent.getBroadcast(context, 10, hungupIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        PendingIntent answerPendingIntent = PendingIntent.getBroadcast(context, 20, answerIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        //customView.setOnClickPendingIntent(R.id.btnAnswer, answerPendingIntent);
        //customView.setOnClickPendingIntent(R.id.btnDecline, hungupPendingIntent);

        // If we get killed, after returning from here, restart
        this.createNotificationChannel();
        NotificationCompat.Builder notification = new NotificationCompat.Builder(context, MEETING_JOIN_CHANNEL_ID);
        notification.setContentTitle("Classmate");
        notification.setTicker("Call_STATUS");
        notification.setContentText("IncomingCall");
        notification.setSmallIcon(R.drawable.v_logo);
        notification.setCategory(NotificationCompat.CATEGORY_CALL);
        notification.setOngoing(true);
        notification.setAutoCancel(true);
        notification.setFullScreenIntent(pendingIntent, true);
        notification.setPriority(NotificationCompat.PRIORITY_MAX);
        Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        notification.setSound(alarmSound);
        notification
                .addAction(R.drawable.common_google_signin_btn_icon_dark,"Hung up", hungupPendingIntent)
                .addAction(R.drawable.common_google_signin_btn_icon_dark,"Answer", answerPendingIntent);
        return notification.build();
    }

    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "wqeeqweq ";
            String description = "2131231 ";
            NotificationChannel channel = new NotificationChannel(MEETING_JOIN_CHANNEL_ID, name, NotificationManager.IMPORTANCE_HIGH);
            Uri alarmSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
            Log.d(TAG, alarmSound.getPath());
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .build();
            channel.setSound(alarmSound, audioAttributes);
            channel.enableVibration(true);
            channel.setImportance(NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(channel);
        }
    }

    public void removeJoinNotification() {
        NotificationManagerCompat mNotificationManager = NotificationManagerCompat.from(context.getApplicationContext());
        mNotificationManager.deleteNotificationChannel(NotificationHelper.MEETING_JOIN_CHANNEL_ID);
        mNotificationManager.cancel(NotificationHelper.MEETING_JOIN__ID);
    }

    public void cancelJoinNotificationOnTimeout() {
        new android.os.Handler(Looper.getMainLooper()).postDelayed(
                new Runnable() {
                    public void run() {
                        Log.d(TAG, "Call ring timeout");
                        removeJoinNotification();
                    }
                },
                RING_TIMEOUT);
    }
}
