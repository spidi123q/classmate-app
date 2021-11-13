# # XD Screens

https://xd.adobe.com/view/68792abe-d733-4c9c-9fe1-056f3c98b9c7-3d2a/screen/ebcfefdf-884e-4749-8f67-8a81d98ec92f/specs/

# # Native Modules

firebase
react-native-vector-icons
@react-native-community/datetimepicker (for color only)
react-native-code-push
react-native-splash-screen

# # Known bugs

1. Location unhandled promise

# # Misc

to connect to local api, run ipconfg and get ipv4 address

# # Boilerplate

yarn add @eva-design/eva @react-native-community/async-storage @react-native-community/datetimepicker @react-native-community/geolocation @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/messaging @twotalltotems/react-native-otp-input @ui-kitten/components @ui-kitten/eva-icons axios clean-deep formik http-status-codes libphonenumber-js lodash lottie-react-native moment pubsub-js

yarn add react-native-android-location-enabler react-native-animatable react-native-country-picker-modal react-native-device-info react-native-elements react-native-get-random-values react-native-material-ripple react-native-numeric-input react-native-raw-bottom-sheet react-native-reanimated react-native-root-toast react-native-svg react-native-svg-transformer react-native-vector-icons react-redux react-router-native redux redux-actions redux-axios-middleware redux-logger redux-persist redux-thunk uuid yup

yarn add --dev @types/google\_\_maps @types/lodash @types/react-native-vector-icons @types/react-redux @types/react-router-native @types/redux-actions @types/redux-logger @types/uuid @types/yup

# Mac Setup

cd android
chmod +x gradlew
"endpoint": "http://10.0.2.2:9090",

# Temp release build fix

. react-native-orientation

apply plugin: 'com.android.library'

android {
compileSdkVersion rootProject.ext.compileSdkVersion
buildToolsVersion rootProject.ext.buildToolsVersion

    defaultConfig {
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }

}

dependencies {
compile "com.facebook.react:react-native:+"
}
