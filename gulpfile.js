var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('utils-merge');

var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');

// nicer browserify errors
var gutil = require('gulp-util');
var chalk = require('chalk');

var isProduction = process.env.NODE_ENV == "production";

var babelifyConfig = {
    "extensions": ['.js', '.json', 'es6'],
    "presets": ['es2015', 'stage-0'],
    "plugins": []
};

var browserifyConfig = {"extensions": ['.js', '.json', '.es6'], debuglog: !isProduction};

function map_error(err) {
    if (err.fileName) {
        // regular error
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.fileName.replace(__dirname, ''))
            + ': '
            + 'Line '
            + chalk.magenta(err.lineNumber)
            + ' & '
            + 'Column '
            + chalk.magenta(err.columnNumber || err.column)
            + ': '
            + chalk.blue(err.description))
    } else {
        // browserify error..
        gutil.log(chalk.red(err.name)
            + ': '
            + chalk.yellow(err.message))
    }
    //this.end()
}

function bundle_js(bundler) {
    return bundler.bundle()
        .on('error', map_error)
        .pipe(source('public/index.js'))
        .pipe(buffer())
        .pipe(concat('index.js'))
        .pipe(gulpif(!isProduction, sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(isProduction,uglify()))
        .pipe(gulpif(!isProduction, sourcemaps.write('.')))
        .pipe(gulp.dest('public/dist'))
}

gulp.task('browserify', function () {
    var bundler = browserify('public/index.js', browserifyConfig).transform(babelify.configure(babelifyConfig));
    return bundle_js(bundler)
});

gulp.task('less', function () {
    return gulp.src('public/styles/main.less')
        .pipe(gulpif(!isProduction, sourcemaps.init()))
        .pipe(less())
        .pipe(gulpif(isProduction, minifyCss()))
        .pipe(gulpif(!isProduction, sourcemaps.write('.')))
        .pipe(gulp.dest('public/dist'))
});

gulp.task('watch-less', function () {
    gulp.watch('public/styles/**/*.less', ['less']);
});

gulp.task('fonts', function () {
    return gulp.src(['node_modules/bootstrap/dist/fonts/**/*']).pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('default', ['browserify', 'less', 'fonts']);