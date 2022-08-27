package b7.classmatetechnolabs.com;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import b7.classmatetechnolabs.com.jitsi.MeetingService;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.Intent;
import android.content.res.Configuration;
import android.view.WindowManager;

public class MainActivity extends ReactActivity {

    private String TAG = this.getClass().getSimpleName();

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "B7International";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashScreenTheme);  // here
      super.onCreate(null);
      Intent meetingService = new Intent(this, MeetingService.class);
      startService(meetingService);
      Bundle extras = getIntent().getExtras();
      getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);


      if (extras != null) {
          String userName = extras.getString("x");
          // and get whatever type user account id is
          Log.d(TAG, "Intent : " + userName);
      }
      else {
          Log.d(TAG, "extras null : " );
      }
  }

  @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
