// jshint ignore: start

// ========================================
// Gulpfile
// ========================================

/**
 * Load dependencies
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    svgfragments = require('postcss-svg-fragments'),
    cssnano = require('cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    del = require('del');



/**
 * NPM package js can be included directly from the node_modules folder.
 * Be sure to consider order of the files and keep dependancies at the top
 * of the stack.
 *
 * 'node_modules/bootstrap/js/dist/modal.js',
 */

var paths = {
    styles:  ['src/sass/**/*.scss'],
    scripts: [
                'node_modules/jquery/dist/jquery.min.js',
                'src/js/vendor/*.js',
                'src/js/*.js'
             ]
};

/**
 * Run the main SASS task, this will create a temp CSS file and Source maps,
 * as well as running vendor prefixes.
 */
gulp.task('sass', function() {

    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions', 'ie 9', 'ie 10'],
            cascade: false
        })
    ];

    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss( plugins ))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.tmp'));

});

/**
 * Compile SVG Spritesheet css
 */
gulp.task('svgcompile', function(){

    var plugins = [
        svgfragments({})
    ];

    return gulp.src('./.tmp/app.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('.tmp'));

});

/**
 * Run the Minify task which has a dependency of the SASS task
 * (SASS will be run first). Minify the temp CSS file and save to the
 * dist directory.
 */
gulp.task('minifycss', function() {

    var plugins = [
        cssnano({})
    ];

    gulp.src('.tmp/app.css')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('../dist/css'));
});


/**
 * Concatenate scripts into a single file and minify the file.
 */
gulp.task('minify-scripts', function() {

    var errors = {
        errorHandler: notify.onError({
            message: "<%= error %>"
        })
    }

    gulp.src(paths.scripts)
        .pipe(plumber(errors))
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../dist/js'));
});


/**
 * Clean up the CSS files
 */
gulp.task('clean-css', function() {
    del([
        './.tmp/*.css',
        '.dist/css/*.css',
        '.dist/css/*.map'
    ]);
});

/**
 * Clean up the JS files
 */
gulp.task('clean-js', function() {
    del([
        './dist/js/*.js',
        './dist/js/*.map'
    ]);
});


/**
 * Set the task run order for style tasks
 */
gulp.task('styles', function(callback) {
    runSequence(
        'clean-css',
        'sass',
        'svgcompile',
        'minifycss',
        callback
    );
});

/**
 * Set the task run order for script tasks
 */
gulp.task('scripts', function(callback) {
    runSequence(
        'clean-js',
        'minify-scripts',
        callback
    );
});


/**
 * Create the watch listener
 */
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
});



/**
 * Set the default task to furst run styles, then scripts and then watch for
 * changes to the JS or SASS files.
 */
gulp.task('default', function (callback) {
    runSequence(
        'styles',
        'scripts',
        'watch',
        callback
    );
});
