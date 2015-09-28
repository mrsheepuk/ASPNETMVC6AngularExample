/// <binding BeforeBuild='inject' Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
    angularFilesort = require("gulp-angular-filesort"),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/",
};

paths.js = [paths.webroot + "js/src/**/*.js"];
paths.css = [paths.webroot + "css/src/**/*.css"];
paths.concatJsDest = paths.webroot + "js/app.min.js";
paths.concatCssDest = paths.webroot + "css/app.min.css";

paths.htmlInject = ["./Views/**/*.cshtml"];

// When adding Bower dependencies, ensure that whatever JS and CSS files
// they provide are added to this list.
paths.libJs = [
    paths.webroot + 'lib/angular/angular.min.js',
    paths.webroot + 'lib/angular-ui-router/release/angular-ui-router.min.js'
];
paths.libCss = [];

paths.concatLibJsDest = paths.webroot + "js/libs.min.js";
paths.concatLibCssDest = paths.webroot + "css/libs.min.css";

paths.concatAll = [paths.concatLibCssDest, paths.concatCssDest, paths.concatLibJsDest, paths.concatJsDest];

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:libJs", function (cb) {
    rimraf(paths.concatLibJsDest, cb);
});

gulp.task("clean:libCss", function (cb) {
    rimraf(paths.concatLibCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:libJs", "clean:libCss"]);

gulp.task("min:js", function () {
    gulp.src(paths.js, { base: "." })
        .pipe(angularFilesort())
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src(paths.css, { base: "." })
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:libJs", function () {
    gulp.src(paths.libJs, { base: "." })
        .pipe(concat(paths.concatLibJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("min:libCss", function () {
    gulp.src(paths.libCss, { base: "." })
        .pipe(concat(paths.concatLibCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css", "min:libJs", "min:libCss"]);

//gulp.task("inject", ["inject:libJsAndCss", "inject:appJs"]);

gulp.task("inject", ["min"], function () {
    // JS libs then CSS libs then our CSS
    var sources = gulp.src(paths.libJs.concat(paths.libCss).concat(paths.css), { base: ".", read: false });
    var appSources = gulp.src(paths.js, { base: "." }).pipe(angularFilesort());
    var minSources = gulp.src(paths.concatAll, { base: ".", read: false });
    gulp.src(paths.htmlInject, { base: "." })
        .pipe(inject(sources, { ignorePath: project.webroot }))
        .pipe(inject(appSources, { name: "app", ignorePath: project.webroot }))
        .pipe(inject(minSources, { name: "min", ignorePath: project.webroot }))
        .pipe(gulp.dest("."));
});
