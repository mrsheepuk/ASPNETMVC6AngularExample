/// <binding BeforeBuild='inject' Clean='clean' />
var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    inject = require("gulp-inject"),
    angularFilesort = require("gulp-angular-filesort"),
    mainBowerFiles = require("main-bower-files"),
    project = require("./project.json");

var paths = {
    webroot: "./" + project.webroot + "/",
};

paths.js = [paths.webroot + "js/src/**/*.js"];
paths.css = [paths.webroot + "css/src/**/*.css"];
paths.concatJsDest = paths.webroot + "js/app.min.js";
paths.concatCssDest = paths.webroot + "css/app.min.css";

// Inject the scripts into any view with the appropriate comments in them.
paths.htmlInject = ["./Views/**/*.cshtml"];

// When adding Bower dependencies, if they have any CSS files, need to add them to
// this array to get included.
paths.libCss = [];

paths.concatLibJsDest = paths.webroot + "js/libs.min.js";
paths.concatLibCssDest = paths.webroot + "css/libs.min.css";

paths.concatAll = [paths.concatLibCssDest, paths.concatCssDest, paths.concatLibJsDest, paths.concatJsDest];

gulp.task("clean:js", function (cb) {
    return rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    return rimraf(paths.concatCssDest, cb);
});

gulp.task("clean:libJs", function (cb) {
    return rimraf(paths.concatLibJsDest, cb);
});

gulp.task("clean:libCss", function (cb) {
    return rimraf(paths.concatLibCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css", "clean:libJs", "clean:libCss"]);

gulp.task("min:js", function () {
    return gulp.src(paths.js, { base: "." })
        .pipe(angularFilesort())
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src(paths.css, { base: "." })
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:libJs", function () {
    return gulp.src(mainBowerFiles())
        .pipe(concat(paths.concatLibJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:libCss", function () {
    return gulp.src(paths.libCss, { base: "." })
        .pipe(concat(paths.concatLibCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css", "min:libJs", "min:libCss"]);

gulp.task("inject", ["min"], function () {
    // Dev: JS libs then CSS libs then our CSS.
    var sources = gulp.src(mainBowerFiles().concat(paths.libCss).concat(paths.css), { base: ".", read: false });
    // Dev: Our JS files.
    var appSources = gulp.src(paths.js, { base: "." }).pipe(angularFilesort());
    // Prod: All minified JS (libs and ours), and CSS.
    var minSources = gulp.src(paths.concatAll, { base: ".", read: false });

    // Substitute into the relevant view files.
    return gulp.src(paths.htmlInject, { base: "." })
        .pipe(inject(sources, { ignorePath: project.webroot })) // Direct 
        .pipe(inject(appSources, { name: "app", ignorePath: project.webroot }))
        .pipe(inject(minSources, { name: "min", ignorePath: project.webroot }))
        .pipe(gulp.dest("."));
});
