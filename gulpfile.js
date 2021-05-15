const gulp = require("gulp");
const { series, src, dest } = require("gulp");
const shell = require("gulp-shell");
const argv = require("yargs").argv;
const jeditor = require("gulp-json-editor");

gulp.task("setBaseUrl", function (done) {
  return gulp
    .src("src/config.json")
    .pipe(
      jeditor(function (json) {
        json.endpoint = argv.local
          ? "http://localhost:9090"
          : "https://api.warrantywallet.wingleinfotech.com";
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
  shell.task("./gradlew assembleRelease", { cwd: "./android" })
);

exports.buildDebugAndroid = series(
  "setBaseUrl",
  "bundleAndroid",
  "gradleBuildDebug"
);
exports.buildReleaseAndroid = series("setBaseUrl", "gradleBuildRelease");
