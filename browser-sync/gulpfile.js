var gulp = require("gulp");
var sass = require("gulp-sass");
let browserSync = require("browser-sync");
var bs = browserSync.create();

gulp.task("sass", function() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(bs.reload({ stream: true }));
});

gulp.task(
  "browser-sync",
  gulp.series("sass", function(cb) {
    bs.init({
      server: {
        baseDir: "./"
      },
      port: 8080,
      https: {
          key: "./ssl/key.pem",
          cert: "./ssl/cert.pem",
          port: 3009
      },
      host: "0.0.0.0"
    });
    cb();
  })
);

gulp.task(
  "watch",
  gulp.series("browser-sync", function() {
    gulp.watch("scss/*.scss", gulp.series("sass"));
    gulp.watch(["*.html", "*.js"]).on("change", () => {
      bs.reload();
    });
  })
);
