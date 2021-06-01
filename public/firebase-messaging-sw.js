// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/7.14.4/firebase-app.js');
// importScripts('/__/firebase/7.14.4/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 */
importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAA3vIKutKcxw9BuftL3RQW30ZlMANfz7w",
  authDomain: "intrepid-axle-275511.firebaseapp.com",
  databaseURL: "https://intrepid-axle-275511.firebaseio.com",
  projectId: "intrepid-axle-275511",
  storageBucket: "intrepid-axle-275511.appspot.com",
  messagingSenderId: "1095222406186",
  appId: "1:1095222406186:web:35c8d2a9c885f51649e753",
  measurementId: "G-5FRN2X9JHN",
});

if (firebase.messaging.isSupported()) {
  console.log("FCM Supported");
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  // [END initialize_firebase_in_sw]

  // If you would like to customize notifications that are received in the
  // background (Web app is closed or not in browser focus) then you should
  // implement this optional method.
  // [START background_handler]
  messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/favicon.ico",
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
  // [END background_handler]
} else {
  console.log("FCM Unsupported");
}
