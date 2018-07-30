/* Gulpfile.js */
let gulp = require('gulp')
let sass = require('gulp-sass')
let webserver = require('gulp-webserver');
let stylelint = require('gulp-stylelint');
let path = require('path')

/* Styles task */
gulp.task('styles', () => {
    return gulp.src(['src/scss/main.scss','src/scss/login.scss'])
        .pipe(sass({
            includePaths: [
                path.join(__dirname, 'node_modules/bootstrap/dist/js'),
                path.join(__dirname, 'node_modules/bootstrap/scss/'),
                path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/scss/'),
                path.join(__dirname, 'src/scss')]
            , outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('dist/css/'))
})

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([ 'node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest("dist/js"))
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
})

// Fonts
gulp.task('fonts', function () {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(gulp.dest('dist/webfonts/'));
});

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles'], cb => cb)
    gulp.watch('src/**/*.html', ['html'], cb => cb)
})

gulp.task('server', () => {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
})

gulp.task('linter', function lintCssTask() {
    return gulp
        .src('src/scss/**/main.scss')
        .pipe(stylelint({
            reporters: [
                { formatter: 'string', console: true }
            ]
        }));
});


gulp.task('start', [
    'html',
    'styles',
    'js',
    //'linter',
    'fonts',
    'server',
    'watch'
], cb => cb)