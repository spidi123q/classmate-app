const gulp = require("gulp");
const { series, src, dest } = require("gulp");
const shell = require("gulp-shell");
const argv = require("yargs").argv;
const jeditor = require("gulp-json-editor");

const prodConfig = {
  endpoint: "https://api.classmate.guru",
  razorpayKeyId: "rzp_live_Cgs8SSSTrZ5cEJ",
};

const localConfig = {
  endpoint: "http://localhost:9090",
  razorpayKeyId: "rzp_test_CqxXRbtceqACE3",
};

gulp.task("setConfig", function (done) {
  return gulp
    .src("src/config.json")
    .pipe(
      jeditor(function (json) {
        if (argv.local) {
          json.endpoint = localConfig.endpoint;
        } else {
          json.endpoint = prodConfig.endpoint;
          json.razorpayKeyId = prodConfig.razorpayKeyId;
        }
        return json; // must return JSON object.
      })
    )
    .pipe(gulp.dest("src/"));
});

gulp.task(
  "bundleAndroid",
  shell.task(
    "npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res"
  )
);
gulp.task(
  "gradleBuildDebug",
  shell.task("./gradlew clean assembleDebug", { cwd: "./android" })
);
gulp.task(
  "gradleBuildRelease",
  shell.task(
    argv.apk ? "./gradlew assembleRelease" : "./gradlew bundleRelease",
    { cwd: "./android" }
  )
);

exports.buildDebugAndroid = series(
  "setConfig",
  "bundleAndroid",
  "gradleBuildDebug"
);
exports.buildReleaseAndroid = series("setConfig", "gradleBuildRelease");
